var Boom = require('boom'),
    Attribute = require('../models/attribute').Attribute,
    AttributeSection = require('../models/attributeSection').AttributeSection,
    Counter = require('../models/counter').Counter,
    async = require('async'),
    attributeData = require('../config/testData').attributeData;


exports.CreateAttribute = {
    handler: function(request, reply) {
        console.log('Wait until you see success message');
        var i = 0;
        AttributeSection.find({}).exec(function(err, attributeSection) {
            if (!err) {
                async.forever(function(callback) {
                    var local = attributeData;
                    local.sectionRef = attributeSection[Math.floor((Math.random() * 99) + 1).toString()]._id;

                    counterValue(function(error, result) {
                        var temp = JSON.parse(JSON.stringify(attributeData));
                        temp.attributeId = result;
                        var attribute = new Attribute(temp);
                        attribute.save(function(err, attribute) {
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

            } else {
                console.log(err)
            }
        })

    }
}

var counterValue = function(callback) {
    Counter.update({
        collectionName: 'attribute',
        fieldName: 'attributeId'
    }, {
        $inc: {
            counterValue: 1
        }
    }, function(err, result) {
        if (err) console.log(err);
        else {
            if (result == 0) {
                counter = new Counter({
                    'collectionName': 'attribute',
                    'fieldName': 'attributeId',
                    'counterValue': 0
                });
                counter.save(function(err, res) {
                    var attributeSectionId = "att" + res.counterValue;
                    callback(err, attributeSectionId);
                });
            } else {
                Counter.findOne({
                    collectionName: 'attribute',
                    fieldName: 'attributeId'
                }, function(err, res) {
                    if (res) {
                        var attributeSectionId = "att" + res.counterValue;
                        callback(err, attributeSectionId);
                    }
                })
            }
        }
    });
}