const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const withdrawHistorySchema = new Schema({
    request_number: {
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
module.exports = withdrawHistory = mongoose.model("withdrawHistory", withdrawHistorySchema);