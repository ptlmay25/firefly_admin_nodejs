const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({

    userId: {
        type: String,
    },
    date: {
        type: Date,
    },
    BankAccountNumber: {
        type: Number,
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    message: {
        type: String
    },
    Solved: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false,
    timestamps: true,
});


module.exports = Contact = mongoose.model("contact", ContactSchema);