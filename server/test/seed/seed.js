const { ObjectID } = require('mongodb');
const { Todo } = require('./../../model/todo');
const { User } = require('./../../model/user');
const jwt = require('jsonwebtoken');


const userOneId = new ObjectID();
const userTw0Id = new ObjectID();

const users = [{
    _id: userOneId,
    email: 'moritz.vogt@vogges.de',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign( {_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]
}, {
    _id: userTw0Id,
    email: 'moritz.vogt@test.de',
    password: 'userTwoPass',
    tokens: [{
        access: 'auth',
        token: jwt.sign( {_id: userTw0Id, access: 'auth'}, 'abc123').toString()
    }]
}];

// Create Mock data -> Creates two todos
const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: userOneId
},{
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333,
    _creator: userTw0Id
}]
const populateTodos = ( done ) => {
    // WIPES WHOLE DATABASE
    Todo.remove( {} ).then( () => {
        Todo.insertMany( todos ) ;
    }).then( () => done () );
};


const populateUsers = ( done ) => {
    User.remove( {} ).then( () => {
        var userOne = new User( users[0] ).save();
        var userTwo = new User( users[1] ).save();

        return Promise.all([ userOne, userTwo ])
    }).then( () => done() );
}

module.exports = { todos, populateTodos, users, populateUsers };