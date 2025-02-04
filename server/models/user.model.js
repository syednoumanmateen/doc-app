const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

}, {
    timestamps: true,
    collation: "user"
})

const user = mongoose.model("User", userSchema)

module.exports = user