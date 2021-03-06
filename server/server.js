require('./config/config')
const _ = require('lodash');
// THIRD PARTY MODULES
var express = require('express');
var bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const cors = require('cors');
var moment = require('moment');

// LOCAL
var { mongoose } = require('./db/mongoose').mongoose;
var { Todo } = require('./model/todo');
var { User } = require('./model/user');
var { Categorie } = require('./model/categorie');

var { authenticate } = require('./middleware/authenticate');

var app = express();

const port = process.env.PORT || 3000;

// Setup Middleware
app.use( bodyParser.json(), cors( {origin: '*'}));

app.post('/categorie', authenticate, ( req, res ) => {
   var categorie = new Categorie({
       text: req.body.text,
       _creator:req.user._id
   });

   categorie.save().then( ( doc ) => {
       res.header("access-control-expose-headers",
           ",x-categorie"
           +",Content-Length"
       );
       res.header( 'x-categorie', categorie.text ).send( doc );
   }, ( e ) => {
       res.status( 400 ).send("Can´t create categorie (categorie must be unique)");
   })
});

app.get('/categorie', authenticate, ( req, res ) => {
    Categorie.find({
        _creator: req.user._id,
    }).then( ( categorie ) => {
        if ( categorie ) {
            res.send( categorie );
        } else {
            res.status( 404 ).send( );
        }
    }).catch( ( e ) => {
        res.status( 400 ).send();
    })
});

app.patch('/categorie', authenticate, ( req, res ) => {
    var body = _.pick( req.body, ['text']);

    Categorie.findOneAndUpdate( {
        text: req.header('x-categorie'),
        _creator: req.user._id
    },{
        $set: body
    }, {
        new: true
    }).then( ( categorie ) => {
        if ( !categorie ) {
            return res.status( 404 ).send();
        }

        res.header( 'x-categorie', body).send( categorie );
    }).catch( ( e ) => {
        res.status( 400 ).send( e )
    })


});

// DELETE
app.delete('/categorie', authenticate, async ( req, res) => {
    try {


        const categorie = await Categorie.findOneAndRemove({
            text: req.header('x-categorie'),
            _creator: req.user._id
        });



        if ( categorie ) {
            res.status( 200 ).send( categorie );
        } else  {
            res.status( 404).send();
        }
    } catch (e) {
        res.status( 400 ).send( e )
    }
});

app.delete('/todos/categorie', authenticate, async ( req,res ) => {
    try {
        const todo = await Todo.remove({
            _creator: req.user._id,
            categorie: req.header('x-categorie'),
        });

        if ( todo ) {
            res.status( 200 ).send( todo );
        } else  {
            res.status( 404).send( );
        }
    } catch (e) {
        res.status( 400 ).send( e );
    }

});

// Setup Route POST
app.post( '/todos', authenticate, ( req, res ) => {
    var todo = new Todo({
        text: req.body.text,
        categorie: req.body.categorie,
        _creator: req.user._id
    });

    // SAVE INPUT FROM POSTMAN
    todo.save().then( ( doc ) => {
        res.send( doc );
    }, ( e ) => {
        res.status( 400 ).send( e );
    })
} );



app.get('/users/me', authenticate, ( req, res ) => {
        res.send( req.user );
});

// Setup Route GET todos
app.get( '/todos', authenticate, ( req, res ) => {
    Todo.find({
        _creator: req.user._id,
        categorie: req.header('x-categorie')
    }).then( ( todos ) => {
        res.send( todos );
    }, ( e ) => {
        res.status( 400 ).send( e );
    })
} );

// Setup Route GET todos by id
app.get( '/todos/:id', authenticate, ( req, res ) => {

    var id  = req.params.id;

    if ( !ObjectID.isValid( id ) ) {
        return res.status( 404 ).send()
    }

   Todo.findOne( {
       _id: id,
       _creator: req.user._id,
       categorie: req.header('x-categorie')

   }).then( ( todo ) => {
       if ( todo ) {
           res.send( todo );
       } else {
           res.status( 404 ).send( );
       }
   }).catch( ( e ) => {
       res.status( 400 ).send();
   })
} );

// DELETE
app.delete('/todos/:id', authenticate, async ( req, res) => {
    const id = req.params.id;
    if ( !ObjectID.isValid( id ) ) {
        return res.status( 404 ).send()
    }

    try {
        const todo = await Todo.findOneAndRemove({
            _id: id,
            _creator: req.user._id
        });

        if ( todo ) {
            res.status( 200 ).send( todo );
        } else  {
            res.status( 404).send();
        }
    } catch (e) {
        res.status( 400 ).send()
    }
});

// UPDATE
app.patch('/todos/:id', authenticate, ( req, res ) => {
    var id = req.params.id;
    var body = _.pick( req.body, ['text', 'completed']);

    if ( !ObjectID.isValid( id ) ) {
        return res.status( 404 ).send()
    }

    if (_.isBoolean( body.completed ) && body.completed) {
        var date = new Date().getTime();
        var formattedTime = moment( date ).format('D MMMM YY');
        body.completedAt = formattedTime;
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate( {
        _id: id,
        _creator: req.user._id
    },{
        $set: body
    }, {
        new: true
    }).then( ( todo ) => {
        if ( !todo ) {
            return res.status( 404 ).send();
        }

        res.send( todo );
    }).catch( ( e ) => {
        res.status( 400 ).send()
    })
});

// POST /users
app.post('/users', async ( req, res ) => {
    try {
        res.header("access-control-expose-headers",
            ",x-auth"
            +",Content-Length"
        );
        var body = _.pick( req.body, [ 'email', 'password']);
        var user = new User( body );

        await user.save();
        const token = await user.generateAuthToken();
        res.header( 'x-auth', token ).send( user );
    } catch (e) {
        res.status(400).send("User can not be created (Invalid Email/Password or User already exists)");
    }
});

// Post /users/login
app.post('/users/login', async ( req, res ) => {
    try {
        res.header("access-control-expose-headers",
            ",x-auth"
            +",Content-Length"
        );
        const body = _.pick( req.body, [ 'email', 'password']);

        const user = await User.findByCredentials( body.email, body.password);
        const token = await user.generateAuthToken()
        res.header( 'x-auth', token ).send( user );
    } catch (e) {
        res.status( 400 ).send("Something went wrong during LogIn (Invalid Email/Password), try again");
    }
});

app.delete( '/users/me/token', authenticate, async ( req, res ) => {
    try {
        await req.user.removeToken( req.token );
        res.status( 200 ).send();
    } catch (e) {
        res.status( 400 ).send()
    }
});

app.listen( port, () => {
    console.log(`Started up on port ${port}`);
});


module.exports = {
    app
};
