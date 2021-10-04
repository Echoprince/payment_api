const dotenv = require('dotenv')
dotenv.config({path: '../Payment_App/config/.env'})

module.exports = {
    PORT : process.env.PORT,
    TOKEN_SECRET : process.env.TOKEN_SECRET,
    MONGO_URI: process.env.MONGO_URI
}

