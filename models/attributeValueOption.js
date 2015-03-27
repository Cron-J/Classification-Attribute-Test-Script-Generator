var validator = require('mongoose-validators');
/**
 * @class attributeValueOption
 * @classdesc attributeValueOption class contains the attributeValueOption details
 */

var attributeValueOption = {

	/**
        value of an object,  and maximum 255 characters.
    */
	value: { type: String,  validate: [validator.isLength(0, 255) ], required: true },

 	/**
    	Descriptions. It contain array of language and description.
  	*/
  	descriptions:  [{
		          language: { type: String},
		          /**
		            description. It can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ) and underscores ( _ )
		            and space and maximum 200 characters.
		          */
		          description:{type: String, validate:[ validator.matches(/^[a-zA-Z0-9_-\s]+$/), validator.isLength(0, 500) ] }
		         }],
	
    /**
        Return Value. It should be String.
    */         
    returnValue: { type: String },

    /**
        Order Number. It should be Number.
    */
    orderNo: { type: Number },

    /**
     * Whether this option default or not. There can be several default options for the
     * single attribute.
    */
	isDefault: { type: Boolean, default: false },

    /**
        Currency. It should be String.
    */
    currency: { type: String },

    /**
        Surcharge Amount. It should be Decimal Number upto two digits.
    */
    surchargeAmount: { type: String, validate:[ validator.matches(/((\d+)((\.\d{1,2})?))$/)] },

    /**
        Surcharge Factor. It should be Decimal Number upto two digits.
    */
    surchargeFactor:{ type: String, validate:[ validator.matches(/((\d+)((\.\d{1,2})?))$/)] },
    

    /**
     * Parametr for holding link to AttributeValueOption image and maximum 500 characters.
     */
    imageUrl: { type: String,  validate: [validator.isURL({ protocols: ['http','https','ftp'], require_tld: true, require_protocol: false, allow_underscores: false }), validator.isLength(0, 500) ] }
};

module.exports = {
	AttributeValueOption: attributeValueOption
}