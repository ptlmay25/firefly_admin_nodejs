const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenHistorySchema = new Schema({
    date: {
        type: String,
    },
    total_revenue:{
        type: Number,
    },
    operating_expenses:{
        type: Number,
    },
    interest_and_taxes:{
        type: Number,
    },
    service_fee:{
        type: Number,
    },
    net_profit:{
        type: Number,
    },
    total_number_of_tokens:{
        type: Number,
    },
    divident_per_token:{
        type: Number,
    },
}, {
    versionKey: false,
    timestamps: true,
});
module.exports = tokenHistory = mongoose.model("tokenHistory", TokenHistorySchema);