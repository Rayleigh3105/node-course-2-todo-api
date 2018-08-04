// ------------------------------ DELETE --------------------------------------
const { MongoClient, ObjectID } = require('mongodb');

// Connection to MongoDB
MongoClient.connect('mongodb://localhost:27017/TodoApp', ( err, client ) => {
   if ( err ) {
       console.log( 'Unable to connect to mongodb server' );
   }
   console.log( 'Connect to MongoDB server' );
   const db = client.db( 'TodoApp' );

   // deleteMany -> Deletes every document where text is 'Eat lunch'
    db.collection('Todos').deleteMany( { text: 'Eat lunch' } ).then( ( result ) => {
        console.log( result );
    });
    
   // deleteOne -> Deletes the first docuemnt where tesxt is 'Eat lunch'
    db.collection('Todos').deleteOne( { text: 'Eat lunch' } ).then( ( result ) => {
        console.log( result );
    })

   // findOneAndDelete -> Finds the fiest document where completed is false and return/delete it
    db.collection('Todos').findOneAndDelete( { completed: false } ).then( ( result ) => {
        console.log( result );
    });
   client.close();
});
