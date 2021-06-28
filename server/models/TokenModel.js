const {Schema, model} = require('mongoose')

const TokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    refreshToken: {
        type: String,
        required: true
    }
}, {collection: 'tokensCollection'})

module.exports = model('tokensCollection', TokenSchema)