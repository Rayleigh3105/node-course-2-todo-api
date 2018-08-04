const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/model/todo');
const { User } = require('./../server/model/user');


var id = '5b64c02d5a21208376a4b9e1';

if ( !ObjectID.isValid( id ) ) {
    console.log('ID is not valid')
}

User.findById({
    _id: id
}).then( ( user ) => {
    if ( !user ) {
        return console.log('Unable to find user')
    }

    console.log(JSON.stringify((user, undefined, 2)))
}, ( e ) => {
    console.log( e );
});

//
// // Find - gets array
// Todo.find( {
//     _id: id
// }).then( ( todos ) => {
//     console.log('Todos', todos)
// });
//
// // FINDONE - gets object
// Todo.findOne({
//     _id: id
// }).then( ( todo ) => {
//     console.log('Todo', todo)
// });
//
// Todo.findById( id ).then( ( todo ) => {
//     if ( !todo ) {
//         return console.log('ID not found');
//     }
//     console.log('Todo', todo)
// }).catch( ( e ) => {
//     console.log( e )
// });
