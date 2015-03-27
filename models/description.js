 var validator = require('mongoose-validators');
 /**
 * @class description
 * @classdesc description class contains the description details
 */

var description = {

  /** 
    descShort.  It contain array of language and description.
  */
  descShort: [{
  				language: { type: String},
           /**
            Short Description can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ), underscores ( _ ), space
            and maximum 20 characters.
            Short description. Shortly describes.
          */
  				description:{type: String, validate:[ validator.matches(/^[a-zA-Z0-9_-\s]+$/), validator.isLength(0, 200) ] }
  			 }],
  
  /** 
    descLong.  It contain array of language and description.
  */
  descLong:  [{
  				language: { type: String},
          /**
            Long Description can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ), underscores ( _ ), 
            space and maximum 100 characters.
             Long description. Contains full description.
          */
  				description:{type: String, validate:[ validator.matches(/^[a-zA-Z0-9_-\s]+$/), validator.isLength(0, 500) ] }
  			 }]
};

module.exports = {
	Description: description
}