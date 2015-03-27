var Boom = require('boom'),
    AttributeSection = require('../models/attributeSection').AttributeSection,
    async = require('async'),
    attributeSectionData = require('../config/testData').attributeSectionData;
 
exports.CreateAttributeSection = {
  handler: function (request, reply) {
    console.log('Wait until you see success message');
    var i = 0;
     async.forever(function(callback) {
        var attributeSection = new AttributeSection(attributeSectionData);
        attributeSection.save(function(err, attribute) {
            if (!err) {
                ++i;
                if ( i == 100){
                    console.log('Record Successfully created');
                    return reply("Record Successfully created");
                }
                callback();
            } else {
                console.log(err);
            }
        });

    }, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Record Successfully created');

            }
        });  
  }
}