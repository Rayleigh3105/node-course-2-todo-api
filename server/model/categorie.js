const todo = require('./todo')
var mongoose = require('mongoose');

// ----------------- MODEL -----------------
var CategorieSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minLength: 1,
        trim: true,
        unique: true,
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
});


var Categorie = mongoose.model('Categorie', CategorieSchema);

module.exports = { Categorie }
