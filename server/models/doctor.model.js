const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    website: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    feesPerConsaltation: {
        type: Number,
        required: true
    },
    timings: {
        type: Object,
        required: true
    }
}, {
    timestamps: true
})

const doctor = mongoose.model("Doctor", doctorSchema)

module.exports = doctor