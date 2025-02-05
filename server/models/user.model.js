const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isadmin: {
        type: Boolean,
        default: false
    },
    isDoctor: {
        type: Boolean,
        default: false
    },
    notification:{
        type:[]
    },
    seennotification:{
        type:[]
    }
}, {
    timestamps: true
})

const user = mongoose.model("User", userSchema)

module.exports = user