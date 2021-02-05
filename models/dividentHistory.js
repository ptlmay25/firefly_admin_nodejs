const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dividendHistorySchema = new Schema({
    date: {
        type: Date,
    },
    dividend_id:{
        type: Number,
        default: 11000,
    },
    user_id:{
        type: String
    },
    num_of_tokens:{
        type: Number
    },
    total_value:{
        type: Number
    },
    dividend_per_token:{
        type: Number
    },
    total_amount:{
        type: Number
    },
}, {
    versionKey: false,
    timestamps: true,
});


module.exports = dividendHistory = mongoose.model("dividendHistory", dividendHistorySchema);