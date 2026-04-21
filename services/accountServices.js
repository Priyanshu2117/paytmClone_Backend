import mongoose, { Mongoose } from "mongoose";
import { Account } from "../db/db.js"

export const getBalance = async (userId) =>{

    const account = await Account.findOne({userId: userId});
    if(!account){
        throw new Error("Something went wrong, user not found")
    }

    return {
        balance: account.balance
    }
}

export const transferMoney = async (data, fromId) =>{

    //here since it is a money transfer so create this as transaction, start a session for that
    const session = await mongoose.startSession();

    session.startTransaction();
    const {to, amount} = data;

    //check from account has sufficient balance or not
    const fromAccunt = await Account.findOne({userId: fromId}).session(session);

    if(!fromAccunt || fromAccunt.balance < amount){
        session.abortTransaction();
        throw new Error("Insufficient balance")
    }
    //check if to account is there or not
    const toAccount = await Account.findOne({userId: to}).session(session);

    if(!toAccount){
        session.abortTransaction();
        throw new Error("Account does not exist");
    }
    //transfer the money
    await Account.updateOne({userId: fromId}, {$inc:{balance: -amount}}).session(session);
    await Account.updateOne({userId: to}, {$inc:{balance: amount}}).session(session)

    //commit the transaction
    await session.commitTransaction();

    return {}

}


