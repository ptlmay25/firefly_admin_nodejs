const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const RetailerSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    mobileNo: {
        type: String,
    },
    aadharCardNo: {
        type: String
    },
    panCardNo: {
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
    storeName: {
        type: String
    },
    storeAddress: {
        type: String
    },
    gstNumber: {
        type: String
    },
    storeCategory: {
        type: String,
    },
    storeZipCode: {
        type: String
    },
    totalArea: {
        type: String
    }
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = user = mongoose.model("retailer", RetailerSchema);