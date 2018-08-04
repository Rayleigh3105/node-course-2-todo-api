var mongoose = require('mongoose');

// Mongoose uses now Promises
mongoose.Promise = global.Promise;

// Connect to Database
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = { mongoose }