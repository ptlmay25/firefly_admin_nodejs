const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    username: {
        type: String,
    },
    gender: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    mobileNo: {
        type: String,
    },
    homeAddress: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zipcode: {
        type: String
    },
    country: {
        type: String
    },
    UPI: {
        type: String
    },
    bankAccountNo: {
        type: String
    },
    IFSC: {
        type: String
    },

    DOB: {
        type: Date
    },
    userImg: {
        type: String
    },
    aadharCardNo: {
        type: String
    },
    acc_bal: {
        type: Number,
        default: 0
    },
    tokens: {
        type: Number,
        default: 0
    },
    total_purchase: {
        type: Number,
        default: 0
    },
    total_sell: {
        type: Number,
        default: 0
    },
    total_dividend: {
        type: Number,
        default: 0
    }
}, {
    versionKey: false,
    timestamps: true,
});
module.exports = user = mongoose.model("user", UserSchema);