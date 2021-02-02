const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const withdrawRequestSchema = new Schema({
    userId: {
        type: String,
    },
    name: {
        type: String,
    },
    UPI: {
        type: String,
    },
    BankAccountNumber: {
        type: Number,
    },
    IFSC: {
        type: String,
    },
    total_amount: {
        type: Number,
    },

}, {
    versionKey: false,
    timestamps: true,
});
module.exports = withdrawRequest = mongoose.model("withdrawRequest", withdrawRequestSchema);