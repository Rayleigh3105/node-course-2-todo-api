const todo = require('./todo')
var mongoose = require('mongoose');

// ----------------- MODEL -----------------
var todoSchema = new mongoose.Schema ( {
    text: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false,
    },
    completedAt: {
        type: String,
        default: null
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

var CategorieSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    todos: [todoSchema]
});


var Categorie = mongoose.model('Categorie', CategorieSchema);

module.exports = { Categorie }
