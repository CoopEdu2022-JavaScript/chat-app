const { MongoClient } = require("mongodb");
const {screenName} = require('./ENV_secret');

// Replace the uri string with your connection string.
const uri = `mongodb+srv://chatapp:${screenName}@cluster0.kox3c4z.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

module.exports = client;
