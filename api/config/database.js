//Set up mongoose connection

const mongoose = require('mongoose');

const host = process.env.DB_CONFIG_HOST;
const port = process.env.DB_CONFIG_PORT;
const db = process.env.DB_CONFIG_DB
const uri = host + port + db;
console.log(uri);
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

module.exports = mongoose;
