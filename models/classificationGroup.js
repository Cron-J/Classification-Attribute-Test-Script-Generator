var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validator = require('mongoose-validators'),
    classGrp2Attribute = require('./classgrp2Attribute').Classgrp2Attribute,
    Timestamp = require('./timestamp').Timestamp,
    autoIncrement = require('mongoose-auto-increment'),
    db = require('../config/db').db,
    Description = require('./description').Description;

    autoIncrement.initialize(db);

/**
  * @module  Classification Group
  * @description contain the details of Classification Group  
*/

var ClassificationGroupSchema = new Schema({

  /**
    reference to Classification Collection and should save id of Classification and is the required field.
  */
  classificationRef: { type: String, ref: 'classification', required: true },

  /**
    reference to Classification Group Collection and should save id of ClassificationGroup. 
  */
  parentClassificationGrpRef: { type:  Schema.ObjectId, ref: 'classificationGroup' },

  /**
    Classification Group ID. It can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ), underscores ( _ ),
    is the required and unique field and maximum 100 characters.
  */
  classificationGroupId: { type: String, validate:[ validator.matches(/^[a-zA-Z0-9_-]+$/), validator.isLength(0, 100) ], unique: true, required: true },

  /**
    Hierarchy Code. It should be string and maximum 100 characters.
  */
  hierarchyCode: { type: String, validate:[ validator.isLength(0, 100) ]},

  /** 
    Status. It should be string and required.
  */
  status: { type: String, required: true },

  /**
    has long and short description.
    Short description. Shortly describes classification.
    Long description. Contains full classification description.
  */
  descriptions: Description,
  
  /**
    order number. It should be Number.
  */
  orderNo: { type: Number },

  /** 
    Document URL 1. Defines url(or workarea relative path) to image/pdf/doc of another document that describes classification group.
    Document URL 1. It can only contain type URL and maximum 250 characters.
  */
  documentUrl1: { type: String, validate: [ validator.isURL({ protocols: ['http','https','ftp'], require_tld: true, require_protocol: false, allow_underscores: false }), validator.isLength(0, 250) ] },

  /**
    Document URL 2. Defines url(or workarea relative path) to image/pdf/doc of another document that describes classification group.
    Document URL 2. It can only contain type URL and maximum 250 characters.
  */
  documentUrl2: { type: String, validate: [ validator.isURL({ protocols: ['http','https','ftp'], require_tld: true, require_protocol: false, allow_underscores: false }), validator.isLength(0, 250) ] },

  /**
    Document URL 3. Defines url(or workarea relative path) to image/pdf/doc of another document that describes classification group.
    Document URL 3. It can only contain type URL and maximum 250 characters.
  */
  documentUrl3: { type: String, validate: [ validator.isURL({ protocols: ['http','https','ftp'], require_tld: true, require_protocol: false, allow_underscores: false }), validator.isLength(0, 250) ] },
  
  /**
    classGrp2Attributes. It is array of classGrp2Attribute class.
  */
  classGrp2Attributes: [classGrp2Attribute],

  /** 
    Timestamp. Define information about creation and updation such as createdBy, updatedBy, createdOn, updatedOn.
  */
  timestamp : Timestamp
  
});

/** pre save hook */
ClassificationGroupSchema.pre('save', function(next){
  now = new Date();
  this.timestamp.updatedOn = now;
  if ( !this.timestamp.createdOn ) {
    this.timestamp.createdOn = now;
  }
  next();
});

ClassificationGroupSchema.plugin(autoIncrement.plugin,{ model: 'group', field: 'classificationGroupId' });

var group = mongoose.model('classificationGroup', ClassificationGroupSchema);

/** export schema */
module.exports = {
    ClassificationGroup: group
};