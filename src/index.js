const express = require('express');
const chalk = require('chalk');
require('dotenv').config();

const app = express()

app.use(express.json())


const PORT = process.env.PORT || 7070


app.listen(PORT, () => {
    console.log(chalk.bold.bgGreen(`Server is running at PORT: ${PORT}`))
})