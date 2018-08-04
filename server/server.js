// NPM (express, body parser)

// THIRD PARTY MODULES
var express = require('express');
var bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');


// LOCAL
var { mongoose } = require('./db/mongoose').mongoose;
var { Todo } = require('./model/todo');
var { User } = require('./model/user');

var app = express();

const port = process.env.PORT || 3000;

// Setup Middleware
app.use( bodyParser.json() );

// Setup Route POST
app.post( '/todos', ( req, res ) => {
    var todo = new Todo({
        text: req.body.text
    });

    // SAVE INPUT FROM POSTMAN
    todo.save().then( ( doc ) => {
        res.send( doc );
    }, ( e ) => {
        res.status( 400 ).send( e );
    })
} );

// Setup Route GET todos
app.get( '/todos', ( req, res ) => {
    Todo.find().then( ( todos ) => {
        res.send( { todos } );
    }, ( e ) => {
        res.status( 400 ).send( e );
    })
} );

// Setup Route GET todos by id
app.get( '/todos/:id', ( req, res ) => {

    var id  = req.params.id;

    if ( !ObjectID.isValid( id ) ) {
        return res.status( 404 ).send()
    }

   Todo.findById( id ).then( ( todo ) => {
       if ( todo ) {
           res.send( todo );
       } else {
           res.status( 404 ).send( );
       }
   }).catch( ( e ) => {
       res.status( 400 ).send();
   })
} );


app.listen( port, () => {
    console.log(`Started up on port ${port}`);
});

module.exports = {
    app
};