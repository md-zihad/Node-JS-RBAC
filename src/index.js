const express = require('express');
const dbConnect = require('./config/dbConnect')
const chalk = require('chalk');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express()

app.use(express.json())

app.use('/user', authRoutes)
app.use('/api', userRoutes)

const PORT = process.env.PORT || 7070


dbConnect();


app.listen(PORT, () => {
    console.log(chalk.bold.bgGreen(`Server is running at PORT: ${PORT}`))
})