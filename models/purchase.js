const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchaseHistorySchema = new Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    user_id: {
        type: String,
        required: true
    },
    num_of_tokens: {
        type: Number,
        required: true
    },
    token_price: {
        type: Number,
        required: true
    },
    payment_mode:{
        type: String,
        required: true
    },
    payment_token:{
        type: String,
        required: true,
        default: ''
    },
    status: {
        type: String,
        required: true,
        default: 'Fulfilled'
    }
}, {
    versionKey: false,
    timestamps: true,
});


module.exports = purchaseHistory = mongoose.model("purchaseHistory", purchaseHistorySchema);