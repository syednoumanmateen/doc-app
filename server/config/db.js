const mongoose = require("mongoose")

const getDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongodb connected ${mongoose.connection.host}`)
    } catch (e) {
        console.log(`Mongodb Server Issue ${e}`)
    }
}

module.exports = getDB