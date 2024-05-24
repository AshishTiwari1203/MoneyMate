const express = require('express')
const User = require('../models/user')
const db = require('../db')
import { zod } from "zod";
import { authMiddleware } from "../middleware";
const bcrypt = require ('bcrypt')
const authMiddleware = require('../middleware')

const router  = express.router();

//Zod signup schema
const SignupSchema = zod.object({
    username : zod.string().email({ message: "Invalid email address" }),
    password : zod.string().min(6, { message: "Password should be at leat 6 char" }),
    FirstName : zod.string().min(1, {message: "Enter a valid name"}),
    LastName : zod.string()
})

//Now in future here we can define the get, post calls
router.post('/signup', async (req, res)=>{
    const body = req.body
    const fl = SignupSchema.safeParse(body);

    if(!fl.success){
        //Send some error msg
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    //Now we have to also check for existing user with the username 
    const chec_existing_user = User.findone({
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

    const new_user = await User.create({
        username : req.body.username,
        password: hashedPassword,
        FirstName: req.body.FirstName,
        FastName: req.body.LastName,
    });

    //After creating we get a unique __id
    const userId = new_user._id;

    //Give Random balance to the user when he signups
    await Account.create({
        userID : userId,
        balance: 1 + Math.random() * 10000
    })


    //Now asigning this id to JWT Token Secret Key
    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    //In the response return the unique id
    res.json({
        message:  "User created successfully",
        token : token
    })
})

//Schema for signin 
const loginSchema = zod.object({
    username : zod.string().email(),
    password : zod.string()
})

    

//Now Sign in route
router.post('/login', async(req, res)=>{
    const body = req.body();
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
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Incorrect username or password"
        });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.json({ token });

})

const UpdateSchema = zod.object({
	password: zod.string().optional().min(6, {message: "Password is to small"}),
	FirstName: zod.string().optional(),
	LastName: zod.string().optional()

})

//Update User Request
router.put('/', authMiddleware, async(req, res)=>{
    const body = req.body;
    const success = zod.safeParse(body)

    if(!success){
         res.status(411).json({
            message: "Error while updating information"
        })
    }

    const update = {}
    if (body.FirstName) update.FirstName = body.FirstName;
    if (body.LastName) update.LastName = body.LastName;
    if(body.password){
        // Hash the new password
      const hashedPassword = await bcrypt.hash(body.password, 10);
      update.password = hashedPassword;
    }

     // Update the user record in the database
    await User.updateOne({ _id: req.userId }, update);

    res.status(200).json({
        message: "Updated successfully"
    })
})

//Now get the users when searched by there Names

router.get('/bulk', (req, res, next) =>{
    const filter = req.query.filter || "";

    const foundUsers = User.find({
        $or:[{
            FirstName: {
                "$regex": filter
            }
        },{
            LastName: {
                "$regex" : filter
            }
        }
    ]
    })

    //Now we want to return the user details of Fetched user 
    res.json({
        i : foundUsers.map(i =>({
            username : i.username,
            FirstName : i.FirstName,
            LastName : i.LastName,
            _id : i._id
        }))
    })
})


module.exports = router