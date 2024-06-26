const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); 
const connectDB = require('./db');
const mainRouter = require('./routes/index');
const cors = require('cors');
const zod = require('zod')

const app = express();

// Initialize dotenv
dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

connectDB();

//Every API call having prefix as '/api/v1' should go on a centralized router file(/router/index.js)
app.use("/api/v1", mainRouter);

app.get('/', (req, res) => {
  res.send('MoneyMate API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = mainRouter;
