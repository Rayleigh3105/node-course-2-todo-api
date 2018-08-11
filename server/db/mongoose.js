var mongoose = require('mongoose');

// Mongoose uses now Promises
mongoose.Promise = global.Promise;

// Connect to Database
mongoose.connect(process.env.MONGODB_URI);

module.exports = { mongoose }

