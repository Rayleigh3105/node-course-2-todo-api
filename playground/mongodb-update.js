// ------------------------------ UPDATE --------------------------------------
const {MongoClient, ObjectID} = require('mongodb');

// Connection to MongoDB
MongoClient.connect('mongodb://localhost:27017/TodoApp', ( err, client ) => {
   if ( err ) {
       console.log( 'Unable to connect to mongodb server' );
   }
   console.log( 'Connect to MongoDB server' );
   const db = client.db('TodoApp');

    // findOneAndUpdate - finds the document with _id and sets name to Jens Müller
    // and increments age
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("5b61e611857666516a7bd573")
    }, {
        $set: {
            name: 'Jens Müller'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then( ( result ) => {
        console.log( result )
    });
   client.close();
});
