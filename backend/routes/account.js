const express = require('express');
const Account = require('../models/Account')
const mongoose = require('mongoose');
const zod = require ('zod')
const bcrypt = require ('bcrypt')
const User = require('./User')
const authMiddleware = require('../middleware')
const JWT_SECRET = require('../config')
const jwt = require('jsonwebtoken');

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

router.post('/transfer', authMiddleware, async (req, res) => {
    const body = req.body;
    const { to, amount } = body;

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // Fetch sender account details
        const sender = await Account.findOne({
            userId: req.userId
        }).session(session);

        if (!sender || sender.balance < amount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        // Fetch receiver account details
        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        // Perform the transfer
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        res.json({
            message: "Transfer successful"
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({
            message: "Transaction failed",
            error: error.message
        });
    }
});


module.exports = router;