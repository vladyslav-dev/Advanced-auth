const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt')
const uuid = require('uuid')

const TokenService = require('./TokenService')
const MailService = require('./MailService')

const UserDto = require('../dtos/userDtos')
const ApiError = require('../exceptions/apiError')

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({ email })

        if (candidate) { // check email on existing
            throw ApiError.BadRequest(`User with email ${email} alreay exist!`)
        }

        const hashPassword = await bcrypt.hash(password, 8)
        const activationLink = uuid.v4()

        const newUser = await UserModel.create({
            email,
            password: hashPassword,
            activationLink
        })
        await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

        const userDto = new UserDto(newUser) // id, email, isActivated
        const tokens = TokenService.generateTokens({ ...userDto }) // {accessToken, refreshToken}

        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async login(email, password) {
        const user = await UserModel.findOne({ email })
        if (!user) {
            throw ApiError.BadRequest("No user with such email")
        }

        const isPasswordEqual = await bcrypt.compare(password, user.password)
        if (!isPasswordEqual) {
            throw ApiError.BadRequest("Password incorrect")
        }

        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({ ...userDto })
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken) {
        await TokenService.removeToken(refreshToken)
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink })

        if (!user) {
            throw ApiError.BadRequest('User with this activation link doesn\'t exist!')
        }
        user.isActivated = true
        await user.save()
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }

        const userData = TokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = await TokenService.findToken(refreshToken)
        if (!userData || !tokenFromDB) {
            throw ApiError.UnauthorizedError()
        }

        const user = await UserModel.findById(userData.id)

        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({ ...userDto })
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return {
            ...tokens,
            user: userDto
        }
    }

    async getAllUsers() {
        return await UserModel.find()
    }

}

module.exports = new UserService()