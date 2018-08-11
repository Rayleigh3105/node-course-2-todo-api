const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/model/todo');
const { User } = require('./../server/model/user');


var id = '5b64c02d5a21208376a4b9e1';

if ( !ObjectID.isValid( id ) ) {
    console.log('ID is not valid')
}

// remove is like find
// Todo.remove({}).then ( (result ) => {
//     console.log( result )
// });

// findOneAndRemove

// findbyIdAndRemove
Todo.findByIdAndRemove("5b6602d300f34b0564a02c5e").then( ( todo ) => {
    console.log( todo )
} )