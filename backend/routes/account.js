const express = require('express');
const Account = require('../models/Account')
import mongoose from "mongoose";
import { zod } from "zod"
const bcrypt = require ('bcrypt')
const authMiddleware = require('../middleware')

const router = express.Router();

//Get the balance
router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});

//Transfer Money to a User
router.post('/transfer', authMiddleware, async (req, res)=>{
    const body = req.body();
    //Concept of session

    const session = await mongoose.startSession();

    session.startTransaction()
    const {to, amount} = body;

    //Now fetching the account details of sender and receiver account
    const sender = await Account.findOne({
        userId : body.userId
    }).session(session)

    if(!sender || sender.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    //end of session: Commit the changes
    await session.commitTransaction();

    res.json({
        message: "Transfer successful"
    });

})

module.exports = router;