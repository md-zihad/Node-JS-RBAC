const express = require('express');
const dbConnect = require('./config/dbConnect')
const chalk = require('chalk');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');

const app = express()

app.use(express.json())

app.use('/user', authRoutes)

const PORT = process.env.PORT || 7070


dbConnect();


app.listen(PORT, () => {
    console.log(chalk.bold.bgGreen(`Server is running at PORT: ${PORT}`))
})