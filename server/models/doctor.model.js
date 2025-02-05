const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({

}, {
    timestamps: true
})

const doctor = mongoose.model("Doctor", doctorSchema)

module.exports = doctor