const nodemailer = require('nodemailer')

class MailService {

    constructor() {
        this.transporeter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporeter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Activation account on " + process.env.API_URL,
            text: '',
            html: 
            `
                <div>
                    <h1>Click on link to activate an account</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        })
    }
}

module.exports = new MailService()