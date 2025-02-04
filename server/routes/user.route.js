const express = require("express")
const { loginController, registerController } = require("../controllers/user.controller")
const router = express()

// Login Start
router.post("/login", loginController)
// Login End

// Register Start
router.post("/register", registerController)
// Register End

module.exports = router