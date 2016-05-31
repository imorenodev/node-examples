var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var dbOper = require('./operations');
var url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log('Connected correctly to server');

  dbOper.insertDocument(
    db, 
    { name: 'Vadonut', description: 'Test' }, 
    'dishes',
    function(result) {
      console.log(result.ops);

      dbOper.findDocuments(db, 'dishes', function(docs) {
        console.log(docs);

        dbOper.updateDocument(
          db,
          { name: 'Vadonut' },
          { description: 'Updated Test' },
          'dishes',
          function(result) {
            console.log(result.result);

            dbOper.findDocuments(
              db,
              'dishes',
              function(docs) {
                console.log(docs);

                db.dropCollection('dishes', function(result) {
                  console.log(result);

                  db.close();
                });
              });
          });

      });
    });
});
