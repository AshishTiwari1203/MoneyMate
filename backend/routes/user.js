const express = require('express')
const User = require('../models/User')
const { JWT_SECRET } = require("../config");
const jwt = require('jsonwebtoken');
const db = require('../db')
const zod = require ('zod')
const bcrypt = require ('bcrypt')
const authMiddleware = require('../middleware')
const Account = require('../models/Account')

const mongoose = require('mongoose');

const router  = express.Router();

// Zod signup schema
const SignupSchema = zod.object({
    username: zod.string().email({ message: "Invalid email address" }),
    password: zod.string().min(6, { message: "Password should be at least 6 characters" }),
    FirstName: zod.string().min(1, { message: "Enter a valid name" }),
    LastName: zod.string().optional()
});

//Now in future here we can define the get, post calls
router.post('/signup', async (req, res)=>{
    const body = req.body
    const result = SignupSchema.safeParse(body);

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid input",
            errors: result.error.errors
        });
    }

    //Now we have to also check for existing user with the username 
    const chec_existing_user = await User.findOne({
        username: req.body.username
    })


    if(chec_existing_user){
        //There is already a user with this username
        return res.status(411).json({
            message: "Username already taken"
        })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
        username : req.body.username,
        password: hashedPassword,
        FirstName: req.body.FirstName,
        FastName: req.body.LastName,
    });

    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})

//Schema for signin 
const loginSchema = zod.object({
    username : zod.string().email({message: "Enter valid Email"}),
    password : zod.string()
})


//Now Sign in route
router.post('/login', async (req, res)=>{
    const body = req.body;
    const fl = loginSchema.safeParse(body)

    if (!fl.success) {
        return res.status(411).json({
            message: "Incorrect inputs, Try Again!"
        })
    }
    
    const user = await User.findOne(
        { username: req.body.username }
    );

    if (!user) {
        return res.status(401).json({
            message: "Incorrect username or password"
        });
    }

    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Incorrect username or password"
        });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.json({ token });

})

const UpdateSchema = zod.object({
    password: zod.string().min(6).optional(),
    FirstName: zod.string().optional(),
    LastName: zod.string().optional()
});

// Update User Request
router.put('/', authMiddleware, async (req, res) => {
    const body = req.body;

    const result = UpdateSchema.safeParse(body);

    if (!result.success) {
        return res.status(400).json({
            message: "Validation error",
            errors: result.error.errors
        });
    }

    const update = {};
    if (body.FirstName) update.FirstName = body.FirstName;
    if (body.LastName) update.LastName = body.LastName;
    if (body.password) {
        try {
            // Hash the new password
            const hashedPassword = await bcrypt.hash(body.password, 10);
            update.password = hashedPassword;
        } catch (error) {
            return res.status(500).json({
                message: "Error hashing password"
            });
        }
    }

    try {
        // Update the user record in the database
        await User.updateOne({ _id: req.userId }, update);

        return res.status(200).json({
            message: "Updated successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error updating user information",
            error: error.message
        });
    }
});

// Now get the users when searched by their Names
router.get('/bulk', async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            FirstName: {
                "$regex": filter
            }
        }, {
            LastName: {
                "$regex": filter
            }
        }]
    })

    // Now we want to return the user details of the fetched users 
   res.json({
        user: users.map(user => ({
            username: user.username,
            FirstName: user.FirstName,
            LastName: user.LastName,
            _id: user._id
        }))
    })
});

module.exports = router;