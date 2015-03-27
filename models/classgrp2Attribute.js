var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	validator = require('mongoose-validators');
	
/**
 * @class classgrp2Attribute
 * @classdesc classgrp2Attribute class contains the classgrp2Attribute details
 */

var classgrp2Attribute = {
	 /**
	    Select attribute from the drop and drag drop, reference to Attribute Collection and should save id of attribute.
	 */
	attributeRef: { type: Schema.ObjectId, ref: 'attribute', required: true },

	/**
		Sort No. should be number.
	*/
	sortNo: { type: Number, required: true },

	/** 
	    group ID can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ), underscores ( _ )
	    and maximum 30 characters.
	 */
	grpId: { type: String, validate:[ validator.matches(/^[a-zA-Z0-9_-]+$/), validator.isLength(0, 30) ], required: true }
};

module.exports = {
	Classgrp2Attribute: classgrp2Attribute
}