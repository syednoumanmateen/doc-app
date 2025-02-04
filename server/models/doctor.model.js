const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({

}, {
    timestamps: true,
    collation: "doctor"
})

const doctor = mongoose.model("Doctor", doctorSchema)

module.exports = doctor