const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenHistorySchema = new Schema({
    token_date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    upload_date: {
        type: Date,
        required: true,
        default: Date.now
    },
    total_revenue:{
        type: Number,
        required: true,
    },
    operating_expenses:{
        type: Number,
        required: true,
    },
    interest_and_taxes:{
        type: Number,
        required: true,
    },
    net_profit:{
        type: Number,
        required: true,
    },
    total_number_of_tokens:{
        type: Number,
        required: true,
    },
    token_price:{
        type: Number,
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = tokenHistory = mongoose.model("tokenHistory", TokenHistorySchema);