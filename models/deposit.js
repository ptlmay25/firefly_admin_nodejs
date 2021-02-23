const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const depositHistorySchema = new Schema({
    user_id:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    total_amount: {
        type: Number,
        required: true,
        default: 0
    },
    mode_of_payment:{
        type: String,
        required: true,
        default: 'Razorpay'
    },
    payment_token:{
        type: String,
        required: true,
        default: ""
    },
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = depositHistory = mongoose.model("depositHistory", depositHistorySchema);