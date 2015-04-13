var Mongoose = require('mongoose'),
    Schema     = Mongoose.Schema;

/** 
  * @module status
  * @description status of classification group contains the details of status
*/


var statusSchema = new Schema({
  status   : { type: String }
})

var status = Mongoose.model('status', statusSchema);

module.exports = {
  Status: status
};
