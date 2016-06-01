var mongoose = require('mongoose');
var assert = require('assert');
var Promotions = require('./models/promotions');

// connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!

  Promotions.create(
    {
      name: 'Weekend Grand Buffet',
      image: 'images/buffet.png',
      label: 'New',
      price: '$19.99',
      description: 'Featuring...'
    },
    function (err, promotion) {
      if (err) throw err;

      console.log('Promotion created!');
      console.log(promotion);
      var id = promotion._id;

      // get all the promotions
      setTimeout(function() {
        Promotions.findByIdAndUpdate(id,
          {
            $set: {
              description: 'Updated Test'
            }
          }, 
          { 
            new: true 
          }
        ).exec(function (err, promotion) {
          if (err) throw err;
          var name = promotion.name,
              id = promotion._id;
          console.log(`Updated descriptions of ${name} promotion!`);
          console.log(promotion);

          promotion.label = 'Limited Time!';

          promotion.save(function(err, promotion) {
            console.log('Updated Label!');
            console.log(promotion);

            console.log('Connected correctly to server');
            db.collection('promotions').drop(function() {
              db.close();
            });
          })
        });
      },3000);
    });
});
