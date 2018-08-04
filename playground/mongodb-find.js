// ------------------------------ FIND --------------------------------------
const {MongoClient, ObjectID} = require('mongodb');

// Connection to MongoDB
MongoClient.connect('mongodb://localhost:27017/TodoApp', ( err, client ) => {
   if ( err ) {
       console.log( 'Unable to connect to mongodb server' );
   }
   console.log( 'Connect to MongoDB server' );
   const db = client.db('TodoApp');

    // find -> Gets all Todos and count it
    db.collection('Todos').find().count().then( ( count ) => {
        console.log('Todos count:', count);
    }, ( err ) => {
        console.log('Unable to fetch data', err)
    });

    // find -> Gets all Users where the name is Moritz Vogt
    db.collection('Users').find( { name: 'Moritz Vogt' } ).count().then( ( count ) => {
        console.log('User count:', count);
    }, ( err ) => {
        console.log('Unable to fetch data', err)
    });
   client.close();
});
