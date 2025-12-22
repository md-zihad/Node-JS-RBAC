const mongoose = require('mongoose');


const dbConnect = async () => {

    if (!process.env.DB_CONNECTION_STRING) {
        console.error("DB_CONNECTION_STRING is not defined");
        process.exit(1);
    }

    try {
        const connect = await mongoose.connect(process.env.DB_CONNECTION_STRING, {
            autoIndex: false,
            serverSelectionTimeoutMS: 10000
        })

        console.log(`Database connected : ${connect.connection.host}, ${connect.connection.name}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = dbConnect;