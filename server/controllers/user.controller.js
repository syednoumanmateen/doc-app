const { hashedPassword, comparePassword, tokenGenerate } = require("../config/helper")
const userModel = require("../models/user.model")

// Login Start
const loginController = async (req, res) => {
    try {
        let { email, password } = req.body
        const userExists = await userModel.findOne({ email })
        // checking email exist
        if (!userExists) return res.status(200).send({ msg: "Invalid email or password", success: false })
        // comparing password from DB
        const encryptPassword = await comparePassword(password, userExists?.password)
        if (!encryptPassword) return res.status(200).send({ msg: "Invalid email or password", success: false })

        //generating token
        userExists.password = null
        const token = await tokenGenerate(userExists)

        return res.status(201).send({ msg: "Login successfully", success: true, data: { ...userExists, token } })
    } catch (e) {
        console.log("🚀 ~ loginController ~ e:", e)
        res.status(500).send({ msg: e.message })
    }
}
// Login End

// Register Start
const registerController = async (req, res) => {
    try {
        let { name, email, password } = req.body
        const userExists = await userModel.findOne({ email })
        // checking email already exist
        if (userExists) return res.status(200).send({ msg: "User alreay exists", success: false })
        // encrypting password for safety
        const encryptPassword = await hashedPassword(password)
        password = encryptPassword
        // creaating new user
        const newUser = new userModel({ name, email, password })
        newUser.save()

        return res.status(201).send({ msg: "Registered successfully", success: true })
    } catch (e) {
        console.log("🚀 ~ registerController ~ e:", e)
        res.status(500).send({ msg: e.message })
    }
}
// Register End

module.exports = {
    loginController,
    registerController
}