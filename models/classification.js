var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validator = require('mongoose-validators'),
    Timestamp = require('./timestamp').Timestamp,
    autoIncrement = require('mongoose-auto-increment'),
    db = require('../config/db').db,
    Description = require('./description').Description;

    autoIncrement.initialize(db);
/**
  * @module  Classification
  * @description contain the details of Classification  
*/

var ClassificationSchema = new Schema({

  /**
    Classification ID. It can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ), underscores ( _ ),
    is the required and unique field and maximum 30 characters.
  */
  classificationId: { type: String, validate:[ validator.matches(/^[a-zA-Z0-9_-]+$/), validator.isLength(0, 30) ], unique: true, required: true },

  /**
    reference to Tennant Collection, should save id of Tenant and is the required field.
  */
  tenantRef : { type:  Schema.ObjectId, ref: 'tenant', index: true, required: true },

  /**
    has long and short description,
    Short description. Shortly describes classification.
    Long description. Contains full classification description.
  */
  descriptions: Description,

  /**
    Version no of classification. It should be string and maximum 10 characters.
  */
  versionNo: { type: String, validate: [validator.isLength(0, 10) ] },

  /**
    Type of classification. should be string and maximum 11 characters.
    Type of classification, like UNSPSC, eClass etc.
  */
  type: { type: String, validate: [validator.isLength(0, 11) ] },

  /**
    Order number. It should be Number.
    Order number. Defines classification sequence between others. Is used by some customers for sorting classification items on UI in case when they are displayed in one list.
  */
  orderNo: { type: Number },

  /**
    Document URL 1. Defines url(or workarea relative path) to image/pdf/doc of another document that describes classification.
    Document URL 1. It can only contain type URL and maximum 250 characters.
  */
  documentUrl1: { type: String, validate: [ validator.isURL({ protocols: ['http','https','ftp'], require_tld: true, require_protocol: false, allow_underscores: false }), validator.isLength(0, 250) ] },

  /**
    Document URL 2. Defines url(or workarea relative path) to image/pdf/doc of another document that describes classification.
    Document URL 2. It can only contain type URL and maximum 250 characters.
  */
  documentUrl2: { type: String, validate: [ validator.isURL({ protocols: ['http','https','ftp'], require_tld: true, require_protocol: false, allow_underscores: false }), validator.isLength(0, 250) ] },

  /**
    Document URL 3. Defines url(or workarea relative path) to image/pdf/doc of another document that describes classification.
    Document URL 3. It can only contain type URL and maximum 250 characters.
  */
  documentUrl3: { type: String, validate: [ validator.isURL({ protocols: ['http','https','ftp'], require_tld: true, require_protocol: false, allow_underscores: false }), validator.isLength(0, 250) ] },
  
  /**
    Timestamp. Define information about creation and updation such as createdBy, updatedBy, createdOn, updatedOn.
  */
  timestamp : Timestamp
  
});

/** pre save hook */
ClassificationSchema.pre('save', function(next){
  now = new Date();
  this.timestamp.updatedOn = now;
  if ( !this.timestamp.createdOn ) {
    this.timestamp.createdOn = now;
  }
  next();
});

ClassificationSchema.plugin(autoIncrement.plugin,{ model: 'classification', field: 'classificationId' });

var classification = mongoose.model('classification', ClassificationSchema);

/** export schema */
module.exports = {
    Classification: classification
};