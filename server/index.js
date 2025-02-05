const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const getDB = require("./config/db")
const userRoutes = require("./routes/user.route")

// rest object
const app = express()

// mongodb connection
getDB()

// middlewares
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

// routes
app.use("/api/v1/user", userRoutes)

// server
let PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server running as ${process.env.NODE_MODE} mode at port ${PORT}`))