var Mongoose = require('mongoose'),
    db = require('../config/db').db;
    Schema     = Mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');
    
    autoIncrement.initialize(db);

/** 
  * @module tenant
  * @description tenant class contains the details of tenant
*/


var tenantSchema = new Schema({
  /** tenant id is indexed */
  tenantId    : { type: Schema.Types.ObjectId, index: true },  
  /** name must be string and required field */
  name   	    : { type: String, required: true, trim: true },
  /** status must be string and required field */
  status      : { type: String, required: true, trim: true},
  /** description must be string */
  description : { type: String, trim: true  }, 
  /** valid from must be string and required field */
  validFrom   : { type: String, required: true, trim: true  },
  /** valid to must be string and required field */
  validTo   	: { type: String, required: true, trim: true  }
});


tenantSchema.plugin(autoIncrement.plugin,{ model: 'tenant', field: 'tenantId' });

var tenant = Mongoose.model('tenant', tenantSchema);

module.exports = {
  Tenant: tenant
};
