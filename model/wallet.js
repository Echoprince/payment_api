const mongoose = require('mongoose')
const Schema = mongoose.Schema

const wallet = new mongoose.Schema({
    balance: {
        type: Number,
        required: true,
    },
    user: {
          type: Schema.Types.ObjectId,
          ref: 'user'
        } 
}, {timestamps: true})

const Wallet = mongoose.model('wallet', wallet )

module.exports = Wallet