var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validator = require('mongoose-validators'),
    Timestamp = require('./timestamp').Timestamp,
    Description = require('./description').Description,
    Type = require('./type').TypeDetails,
    autoIncrement = require('mongoose-auto-increment'),
    db = require('../config/db').db,
    AttributeValueOption = require('./attributeValueOption').AttributeValueOption;

    autoIncrement.initialize(db);

/**
  * @module  Attribute
  * @description contain the details of Attribute  
*/

var AttributeSchema = new Schema({
  
  /** 
    Attribute ID. It can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ), underscores ( _ ),
    is the required and unique field and maximum 50 characters.
  */
  attributeId: { type: String, validate:[ validator.matches(/^[a-zA-Z0-9_-]+$/), validator.isLength(0, 50) ], unique: true, required: true },

  /**
    External Attribute ID. It can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ), underscores ( _ )
    and maximum 100 characters.
  */
  extAttributeId: { type: String, validate:[ validator.matches(/^[a-zA-Z0-9_-]+$/), validator.isLength(0, 100) ] },

  /**
    has long and short description,
    Short description. Shortly describes attribute.
    Long description. Contains full attribute description.
  */
  descriptions: Description,

  /**
    Ext Default Name. It can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ), underscores ( _ ),
    space and maximum 50 characters.
  */
  extDefaultName: { type: String, validate: [ validator.matches(/^[a-zA-Z0-9_-\s]+$/), validator.isLength(0, 50) ] },

  /**
    Select Section from the drop down list, reference to Attribute Section Collection and should save id of attributeSection.
  */
  sectionRef: { type: Schema.ObjectId, ref: 'attributeSection'},

  /**
    Select Unit of Measure from the drop down list.
  */
  unitOfMeasure: { type: String },

  /**
    Order Number. It should be Number.
  */
  orderNo: { type: Number },

  /** 
    type of Attribute (like string/numeric/date) and is dropdown list.
  */
  types: [ Type ],

  /**
    Multivalued. should be Boolean.
  */
  isMultivalued: { type: Boolean, default: false },

  /**
   Required. should be Boolean.
  */
  isRequired: { type: Boolean, default: false },

  /**
    MultiLanguage. should be Boolean.
  */
  isMultiLanguage: { type: Boolean, default: false },

  /**
    Variable. should be Boolean.
  */
  isVariable: { type: Boolean, default: false },

  /**
    Readonly. should be Boolean.
  */
  isReadonly: { type: Boolean, default: false },

  /**
    ValueOptions. Define array of attribute value option class.
  */
  valueOptions: [AttributeValueOption],

  /**
    Timestamp. Define information about creation and updation such as createdBy, updatedBy, createdOn, updatedOn.
  */
  timestamp : Timestamp
  
});

/** pre save hook */
AttributeSchema.pre('save', function(next){
  now = new Date();
  this.timestamp.updatedOn = now;
  if ( !this.timestamp.createdOn ) {
    this.timestamp.createdOn = now;
  }
  next();
});

AttributeSchema.plugin(autoIncrement.plugin,{ model: 'attribute', field: 'attributeId' });

var attribute = mongoose.model('attribute', AttributeSchema);

/** export schema */
module.exports = {
    Attribute: attribute
};