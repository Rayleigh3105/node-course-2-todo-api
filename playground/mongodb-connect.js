//const MongoClient = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb');

// var user = {name: 'Moritz', age: 20};
// // ES 6 Destructor
// var {name} = user;
// console.log(name)

MongoClient.connect('mongodb://localhost:27017/TodoApp', ( err, client ) => {
   if ( err ) {
       console.log( 'Unable to connect to mongodb server' );
   }
   console.log( 'Connect to MongoDB server' );
   const db = client.db('TodoApp');

   // db.collection('Todos').insertOne({
   //     text: 'something to do ',
   //     completed: false
   // }, ( err, result) => {
   //     if ( err ) {
   //         return console.log('Unable to insert Todo', err)
   //     }
   //     console.log(JSON.stringify(result.ops, undefined, 2))
   // });

    // db.collection('Users').insertOne({
    //     name: 'Moritz Vogt',
    //     age: 20,
    //     location: 'Bayern'
    // }, ( err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert Todo', err)
    //     }
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
    //     //console.log(JSON.stringify(result.ops, undefined, 2));
    // });
   client.close();
});