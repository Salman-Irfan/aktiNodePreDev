const mongoose = require("mongoose");

const MONGOURI = "mongodb://127.0.0.1:27017/akti";

const connectToMongodb = () => {
    mongoose
        .connect(MONGOURI)
        .then(() => {
            console.log(`Connected to MongoDB at ${MONGOURI}`);
        })
        .catch((error) => {
            console.error(`Error connecting to MongoDB at ${MONGOURI}:`, error);
        });
};


module.exports = connectToMongodb;
