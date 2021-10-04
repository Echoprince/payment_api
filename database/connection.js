const mongoose = require('mongoose')
const {MONGO_URI} = require('../config.js')

const connectDB = async () => {
    try {

        const con = await mongoose.connect(`${MONGO_URI}`, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`MongoDB Connected: ${con.connection.host}`)
        
    } catch (error) {
        console.log(error)
        process.exit(1) 
    }
}

module.exports = connectDB