var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
  * @module  Attribute
  * @description contain the details of Attribute  
*/

var CounterSchema = new Schema({
  
  collectionName: { type: String },

  counterValue: { type: Number },

  fieldName: { type: String }
  
});


var counter = mongoose.model('counter', CounterSchema);

/** export schema */
module.exports = {
    Counter: counter
};