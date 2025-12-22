const express = require('express');
const dbConnect = require('./config/dbConnect')
const chalk = require('chalk');
require('dotenv').config();

const app = express()

app.use(express.json())


const PORT = process.env.PORT || 7070


dbConnect();


app.listen(PORT, () => {
    console.log(chalk.bold.bgGreen(`Server is running at PORT: ${PORT}`))
})