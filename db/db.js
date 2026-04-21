import mongoose from 'mongoose';
import { minLength } from 'zod';
import dotenv from 'dotenv';
dotenv.config();


mongoose.connect(process.env.DB_URL);
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
     },
    lastName:{
        type: String,
        required: true
    }, 
    userName: {
        type: String,
        required: true,
        unique: true //username should be unique
    },
    password: {
        type: String,
        required: true,
    }
})

const AccountSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId, //reference to user model,
        ref: "User",
        required: true
    }, 
    balance:{
        type: Number,
        required: true
    }
})

const User = mongoose.model('User', UserSchema);
const Account = mongoose.model('Account', AccountSchema);

export {
    User,
    Account
} 
    