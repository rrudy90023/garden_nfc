const conn = {};
const config = require('./config');
const mongoose = require('mongoose');

conn.connectorMain = mongoose.connect(config.mongoUri, { useNewUrlParser: true });
conn.connectorCreate = mongoose.createConnection(config.mongoUri, { useNewUrlParser: true });
module.exports = conn;