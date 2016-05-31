var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connetion URL
var url = 'mongodb://localhost:27017/conFusion';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(err, null);
  console.log('Connected to server correctly.');

  // specify mongodb database collection
  var collection = db.collection('dishes');

  collection.insertOne({
    name: 'Uthapizza', 
    description: 'test'},
    function(err, result) {
      assert.equal(err, null);
      console.log('After insert: ');
      // ops will return all documents inserted
      console.log(result.ops);

      // find all documents in the collection
      collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log('Found: ');
        console.log(docs);

        db.dropCollection('dishes', function(err, result) {
          assert.equal(err, null);
          // close connection to database
          db.close();
        });
      });
    });
});
