var mongoose = require('mongoose');

// ----------------- MODEL -----------------
var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    categorie: {
        type: String,
        minLength: 1,
        required: true,
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

module.exports = { Todo };
