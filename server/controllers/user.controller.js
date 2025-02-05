const { hashedPassword, comparePassword, tokenGenerate } = require("../config/helper")
const user = require("../models/user.model")
const userModel = require("../models/user.model")

// Login Start
const loginController = async (req, res) => {
    try {
        let { email, password } = req.body
        const userExists = await userModel.findOne({ email }).lean()
        // checking email exist
        if (!userExists) return res.status(200).send({ msg: "Invalid email or password", success: false })
        // comparing password from DB
        const encryptPassword = comparePassword(password, userExists?.password)
        if (!encryptPassword) return res.status(200).send({ msg: "Invalid email or password", success: false })

        //generating token
        userExists.password = null
        const token = await tokenGenerate(userExists)

        return res.status(201).send({ msg: "Login successfully", success: true, data: { ...userExists, token } })
    } catch (e) {
        console.log("🚀 ~ loginController ~ e:", e)
        res.status(500).send({ msg: e.message, success: false })
    }
}
// Login End

// Register Start
const registerController = async (req, res) => {
    try {
        const userExists = await userModel.findOne({ email: req.body.email })
        // checking email already exist
        if (userExists) return res.status(200).send({ msg: "User alreay exists", success: false })
        // encrypting password for safety
        const encryptPassword = await hashedPassword(req.body.password)

        // creaating new user
        req.body.password = encryptPassword
        await userModel.create(req.body)

        return res.status(201).send({ msg: "Registered successfully", success: true })
    } catch (e) {
        console.log("🚀 ~ registerController ~ e:", e)
        res.status(500).send({ msg: e.message, success: false })
    }
}
// Register End

// logged in user fetch start
const getLoginUserController = async (req, res) => {
    try {
        const userExists = await userModel.findById(req.userId).select('-password').lean();
        // checking user exists
        if (!userExists) return res.status(200).send({ msg: "User Not Exists", success: false })

        return res.status(201).send({ msg: "User fetched successfully", success: true, data: userExists })
    } catch (e) {
        console.log("🚀 ~ getLoginUserController ~ e:", e)
        res.status(500).send({ msg: e.message, success: false })
    }
}
// logged in user fetch end

// user fetch start
const getUserController = async (req, res) => {
    try {
        const userExists = await userModel.findById(req.params.id).select('name,email,isDoctor,isAdmin').lean();
        // checking user exists
        if (!userExists) return res.status(200).send({ msg: "User Not Exists", success: false })

        return res.status(201).send({ msg: "User fetched successfully", success: true, data: userExists })
    } catch (e) {
        console.log("🚀 ~ registerController ~ e:", e)
        res.status(500).send({ msg: e.message, success: false })
    }
}
// user fetch end

// user fetch start
const getUsersController = async (req, res) => {
    try {
        const userExists = await userModel.find({}).select('name,email,isDoctor,isAdmin').lean();
        // checking user exists
        if (userExists && user.length <= 0) return res.status(200).send({ msg: "Users Not Found", success: false })

        return res.status(201).send({ msg: "Users fetched successfully", success: true, data: userExists })
    } catch (e) {
        console.log("🚀 ~ registerController ~ e:", e)
        res.status(500).send({ msg: e.message, success: false })
    }
}
// user fetch end

module.exports = {
    loginController,
    registerController,
    getLoginUserController,
    getUserController,
    getUsersController
}