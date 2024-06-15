const express = require('express');
const mongoose = require('mongoose');
const zod = require('zod');
// const bcrypt = require('bcrypt');
const Account = require('../models/Account'); 
const authMiddleware = require('../middleware'); 
// const { JWT_SECRET } = require("../config");

const router = express.Router();
router.use(authMiddleware);

// Get the balance
router.get("/balance", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        res.json({ balance: account.balance });
    } catch (error) {
        res.status(500).json({ message: "Failed to get balance", error: error.message });
    }
});

//Transfer Money
router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { amount, to } = req.body;

    // Don't allow transfer to oneself
    if (to === req.userId) {
        await session.abortTransaction();
        return res.json({ message: "Cannot Transfer to yourself!" });
    }

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({
    userId: to,
    }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer within transaction
    await Account.updateOne(
        { userId: req.userId },
        { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
        { userId: to },
        { $inc: { balance: amount } }
    ).session(session);

    // Commit the transaction
    await session.commitTransaction();

    res.json({
        message: "Transfer successful"
    });
});

module.exports = router;