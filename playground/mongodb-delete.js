const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', ( err, client ) => {
   if ( err ) {
       console.log( 'Unable to connect to mongodb server' );
   }
   console.log( 'Connect to MongoDB server' );
   const db = client.db('TodoApp');

   // deleteMany
   //  db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
   //      console.log(result);
   //  });
   // deleteOne
   //  db.collection('Todos').deleteOne({text: 'Eat lunch'}).then( ( result ) => {
   //      console.log( result );
   //  })

   // findOneAndDelete
   //  db.collection('Todos').findOneAndDelete({completed: false}).then( ( result ) => {
   //      console.log(result);
   //  });

    // db.collection('Users').deleteMany({name: 'Moritz Vogt'}).then( ( result ) => {
    //     console.log( result );
    // })
    db.collection('Users').findOneAndDelete( { _id: new ObjectID('﻿﻿5b61e619857666516a7bd577') } ).then( ( result ) => {
        console.log( JSON.stringify(result,undefined,2) );
    })
   //client.close();
});