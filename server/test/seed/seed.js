const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../model/todo');
const {User} = require('./../../model/user');
const { Categorie } = require('./../../model/categorie');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
    _id: userOneId,
    email: 'andrew@example.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
}, {
    _id: userTwoId,
    email: 'jen@example.com',
    password: 'userTwoPass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
}];

const categories = [{
    _id: new ObjectID(),
    text: "Categorie1",
    _creator: userOneId
},{
    _id: new ObjectID(),
    text: "Categorie2",
    _creator: userTwoId
}];

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: userOneId,
    categorie: categories[0]._id
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    categorie: categories[1]._id,
    completed: true,
    completedAt: 333,
    _creator: userTwoId
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo])
    }).then(() => done());
};

const populateCategories = ( done ) => {
    Categorie.remove({}).then( () => {
        var categorieOne = new Categorie(categories[0]).save();
        var categorieTwo = new Categorie(categories[1]).save()

        return Promise.all([categorieOne,categorieTwo])
    }).then( () => done())
};

module.exports = {todos, populateTodos, users, populateUsers,categories,  populateCategories};
