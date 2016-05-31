var mongoose = require('mongoose');
var assert = require('assert');
var Dishes = require('./models/dishes-1');

// connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected correctly to server');

  // create a new dish
  var newDish = Dishes({
    name: 'Uthapizza',
    description: 'Test'
  });
  
  // save the dish
  newDish.save(function(err) {
    if (err) throw err;
    console.log('Dish Created!');

    // get all the dishes
    Dishes.find({}, function(err, dishes) {
      if (err) throw err;

      // print object of all the dishes
      console.log(dishes);

      // drop collection and close database
      db.collection('dishes').drop(function() {
        db.close();
      });
    });
  });
});
