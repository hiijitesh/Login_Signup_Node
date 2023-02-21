const mongoose = require('mongoose')
const { DB_URI } = process.env

exports.connect = () => {
    mongoose.set('strictQuery', true);
    //connecting to the database
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
    })
        .then(() => {
            console.log("Successfully connected to database");
        })
        .catch((error) => {
            console.log("database connection failed. exiting now...");
            console.error(error);
            process.exit(1);

        })
}