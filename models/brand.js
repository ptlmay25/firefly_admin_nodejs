const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BrandSchema = new Schema({

    brandName: {
        type: String,
    },
    year: {
        type: Date,
    },
    noOfProduct: {
        type: Number,
    },
    avgRevenue: {
        type: Number
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    about: {
        type: String,

    }
}, {
    versionKey: false,
    timestamps: true,
});


module.exports = Brand = mongoose.model("brand", BrandSchema);