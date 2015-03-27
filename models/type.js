
/**
 * @class Type
 * @classdesc Type class contains the type details
 */

var typeDetails = {
		   /**
	    	 Type Name. It should be String, required field and should be one from enum.
		   */
			typeName: {type: String, required: true, enum:['boolean','date','integer','numeric','string','text','document','email','reference'] },
            
            /**
	    	 Min length. It should be Number.
		   */
            minimumLength: { type: Number } ,
            
            /**
	    	 Max length. It should be Number.
		   */
            maximumLength: { type: Number } ,
            
            /**
	    	 Min value. It should be Number.
		   */
            minValue: { type: Number } ,
            
            /**
	    	 Max value. It should be Number.
		   */
            maxValue: { type: Number } ,
            
            /**
	    	 Regular expression. It should be String.
		   */
            regularExp: { type: String }
};

module.exports = {
	TypeDetails: typeDetails
}