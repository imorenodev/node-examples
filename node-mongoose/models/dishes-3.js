var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create comment schema
// will be used as a sub-document to the dishSchema under 'comments'
var commentSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// create a schema
var dishSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    comments: [commentSchema]
  },
  { 
    timestamps: true 
  }
);

// the schema is useless so far
// we need to create a model using it
var Dishes = mongoose.model('Dish', dishSchema);

// make model available to node application
module.exports = Dishes;
