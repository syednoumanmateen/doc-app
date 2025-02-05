const express = require("express")
const { loginController, registerController, getLoginUserController } = require("../controllers/user.controller")
const authMiddleware = require("../middelwares/auth.middleware")
const router = express()

// Login Start
router.post("/login", loginController)
// Login End

// Register Start
router.post("/register", registerController)
// Register End

// user Start
router.get("/", [authMiddleware], getLoginUserController)
// user End

module.exports = router