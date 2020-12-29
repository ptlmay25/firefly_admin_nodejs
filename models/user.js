import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    id : String,
    join_date : { type: Date, default: Date.now },
    name: String,
    phone_number : String,
    birthday: Date,
    gender : String,
    total_purchase : Number,
    account_balance : Number, 
});

const User = mongoose.model('User', userSchema)