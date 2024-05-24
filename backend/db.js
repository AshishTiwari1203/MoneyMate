const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();

//Making a async and await funtion for connection
const connectDB = async () =>{
    //Using try and catch method 
    try{
        await mongoose.connect(process.env.MONGODB_URI);

        //Display the confirmation on terminal 
        console.log("Database connection successful")
    }
    catch(error){
        console.error('Error connecting to the Database', error);
        process.exit(1);
    }
};


module.exports = connectDB; 