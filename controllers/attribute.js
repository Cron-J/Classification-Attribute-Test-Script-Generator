var Boom = require('boom'),
    Attribute = require('../models/attribute').Attribute,
    ClassificationGroup = require('../models/classificationGroup').ClassificationGroup,
    AttributeSection = require('../models/attributeSection').AttributeSection,
    async = require('async'),
    attributeData = require('../config/testData').attributeData;
    

exports.CreateAttribute = {
  handler: function (request, reply) {
    console.log('Wait until you see success message');
    var i = 0;
    AttributeSection.find({}).exec(function(err, attributeSection){
        if(!err){
            async.forever(function(callback) {
            var local = attributeData;
            local.sectionRef = attributeSection[Math.floor((Math.random() * 99) + 1).toString()]._id;
            var attribute = new Attribute(attributeData);
            attribute.save(function(err, attribute) {
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

        } else {
            console.log(err)
        }
    })
      
  }
}