const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./db');
const User = require('./models/user');
const mainRouter = require('./routes/index');
const cors = require('cors')

const app = express();
app.use(cors());

//Body parser

app.use(express.json());

//Every API call having prefix as '/api/v1' should go on a centralized router file(/router/index.js)
app.use("/api/v1", mainRouter);

PORT = 3000

connectDB();

app.get('/', (req, res) => {
  res.send('MoneyMate API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = mainRouter;
