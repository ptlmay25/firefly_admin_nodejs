const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sellHistorySchema = new Schema({
    date: {
        type: Date,
    },
    sell_id:{
        type: Number,
        default: 11000,
    },
    user_acc_num:{
        type: Number
    },
    num_of_tokens:{
        type: Number
    },
    token_price:{
        type: Number
    },
    total_price:{
        type: Number
    },
    status:{
        type: String,
        default: 'Completed'
    }
}, {
    versionKey: false,
    timestamps: true,
});


module.exports = sellHistory = mongoose.model("sellHistory", sellHistorySchema);