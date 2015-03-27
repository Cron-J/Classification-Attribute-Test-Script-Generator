
/**
 * @class timestamp
 * @classdesc timestamp class contains the timestamp details
 */

var timestamp = {

  /** contains the id of creation and will be created automatically during creation */
  createdBy : { type: String, default:'jcadmin' },

  /** contains the date of creation and will be created automatically during creation */
  createdOn : { type: Date },
  
  /** contains the id of creation and will be created automatically during creation */
  updatedBy : { type: String, default:'jcadmin' },

  /** contains the date of updation and will be created/updated automatically during updation */ 
  updatedOn : { type: Date }
};

module.exports = {
	Timestamp: timestamp
}