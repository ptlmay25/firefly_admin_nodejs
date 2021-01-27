const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchaseHistorySchema = new Schema({
    date: {
        type: Date,
    },
    pur_id:{
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
        default: 'Pending'
    }
}, {
    versionKey: false,
    timestamps: true,
});


module.exports = purchaseHistory = mongoose.model("purchaseHistory", purchaseHistorySchema);