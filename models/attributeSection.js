var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validator = require('mongoose-validators'),
    Timestamp = require('./timestamp').Timestamp;

/**
  * @module  AttributeSection
  * @description contain the details of Attribute Section
*/

var AttributeSectionSchema = new Schema({
  
  /**
    Attribute Section ID. It can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ) 
    and underscores ( _ ) and is the required field and unique field and maximum 50 characters.
  */
  attributeSectionId: { type: String, validate:[ validator.matches(/^[a-zA-Z0-9_-]+$/), validator.isLength(0, 50) ], unique: true, required: true },

  /** 
    Name.  It contain array of language and name.
  */
  names:  [{
          language: { type: String},
          /**
            name. It can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ) and underscores ( _ )
            and space and maximum 200 characters.
          */
          name:{type: String, validate:[ validator.matches(/^[a-zA-Z0-9_-\s]+$/), validator.isLength(0, 200) ] }
         }],


  /**
    Descriptions. It contain array of language and description.
  */
  descriptions:  [{
          language: { type: String},
          /**
            description. It can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ) and underscores ( _ )
            and space and maximum 500 characters.
          */
          description:{type: String, validate:[ validator.matches(/^[a-zA-Z0-9_-\s]+$/), validator.isLength(0, 500) ] }
         }],

  /** 
    Order Number. It should be Number.
  */
  orderNo: { type: Number },

  /**
    Timestamp. Define information about creation and updation such as createdBy, updatedBy, createdOn, updatedOn.
  */
  timestamp : Timestamp
  
});

/** pre save hook */
AttributeSectionSchema.pre('save', function(next){
  now = new Date();
  this.timestamp.updatedOn = now;
  if ( !this.timestamp.createdOn ) {
    this.timestamp.createdOn = now;
  }
  next();
});

var attributeSection = mongoose.model('attributeSection', AttributeSectionSchema);

/** export schema */
module.exports = {
    AttributeSection: attributeSection
};