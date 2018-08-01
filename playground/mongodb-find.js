const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', ( err, client ) => {
   if ( err ) {
       console.log( 'Unable to connect to mongodb server' );
   }
   console.log( 'Connect to MongoDB server' );
   const db = client.db('TodoApp');

  ç // db.collection('Todos').find({
    //    //     _id: new ObjectID('5b60cf49915f23ef482cef78')
    //    // }).toArray().then( ( docs ) => {
    //    //     console.log('Todos');
    //    //     console.log(JSON.stringify( docs, undefined, 2 ));
    //    // }, ( err ) => {
    //    //     console.log('Unable to fetch data', err)
    //    // });

    db.collection('Todos').find().count().then( ( count ) => {
        console.log('Todos count:', count);
    }, ( err ) => {
        console.log('Unable to fetch data', err)
    });

    db.collection('Users').find({name: 'Moritz Vogt'}).count().then( ( count ) => {
        console.log('User count:', count);
    }, ( err ) => {
        console.log('Unable to fetch data', err)
    });

   //client.close();
});