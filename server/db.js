const mongoose = require('mongoose');

const MongoURI = "mongodb://127.0.0.1:27017/ENotes";

const connectToMongo = async () => {
    mongoose.connect(MongoURI, await console.log('Connected to Mongo Successfully.'))
}

module.exports = connectToMongo;