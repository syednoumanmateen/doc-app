const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// SECRETKEY
const secretKey = process.enc.SECRET_KEY

// hashing password
const hashedPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt, secretKey)
    } catch (e) {
        console.log(`error: ${e}`)
    }
}
// hashing password

// compare password
const comparePassword = async (password, encryptPassword) => {
    try {
        return await bcrypt.compare(password, encryptPassword, secretKey)
    } catch (e) {
        console.log(`error: ${e}`)
    }
}
// compare password

// generate token
const tokenGenerate = async (data) => {
    try {
        return await jwt.sign(data, secretKey, { expiresIn: "1d" })
    } catch (e) {
        console.log(`error: ${e}`)
    }
}
// generate token

// verify token
const verifyToken = async (token) => {
    try {
        const data = await jwt.verify(token, secretKey)
        return { ...data }
    } catch (e) {
        console.log(`error: ${e}`)
    }
}
// verify token

module.exports = {
    hashedPassword,
    comparePassword,
    tokenGenerate,
    verifyToken
}