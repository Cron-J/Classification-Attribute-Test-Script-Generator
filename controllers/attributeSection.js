var Boom = require('boom'),
    AttributeSection = require('../models/attributeSection').AttributeSection,
    Counter = require('../models/counter').Counter,
    async = require('async'),
    attributeSectionData = require('../config/testData').attributeSectionData;

exports.CreateAttributeSection = {
    handler: function(request, reply) {
        console.log('Wait until you see success message');
        var i = 0;
        async.forever(function(callback) {
            counterValue(function(error, result) {
                var temp = JSON.parse(JSON.stringify(attributeSectionData));
                temp.attributeSectionId = result;
                var attributeSection = new AttributeSection(temp);
                attributeSection.save(function(err, attribute) {
                    if (!err) {
                        ++i;
                        if (i == 100) {
                            console.log('Record Successfully created');
                            return reply("Record Successfully created");
                        }
                        callback();
                    } else {
                        console.log(err);
                    }
                });
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

var counterValue = function(callback) {
    Counter.update({
        collectionName: 'attributeSection',
        fieldName: 'attributeSectionId'
    }, {
        $inc: {
            counterValue: 1
        }
    }, function(err, result) {
        if (err) console.log(err);
        else {
            if (result == 0) {
                counter = new Counter({
                    'collectionName': 'attributeSection',
                    'fieldName': 'attributeSectionId',
                    'counterValue': 0
                });
                counter.save(function(err, res) {
                    var attributeSectionId = "attSection" + res.counterValue;
                    callback(err, attributeSectionId);
                });
            } else {
                Counter.findOne({
                    collectionName: 'attributeSection',
                    fieldName: 'attributeSectionId'
                }, function(err, res) {
                    if (res) {
                        var attributeSectionId = "attSection" + res.counterValue;
                        callback(err, attributeSectionId);
                    }
                })
            }
        }
    });
}