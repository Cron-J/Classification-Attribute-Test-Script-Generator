var Boom = require('boom'),
    Classification = require('../models/classification').Classification,
    Tenant = require('../models/tenant').Tenant,
    Counter = require('../models/counter').Counter,
    async = require('async'),
    Common = require('./common'),
    classification = require('../config/testData').classification;

exports.CreateClassification = {
    handler: function(request, reply) {
        var i = 0;
        console.log('Wait until you see success message');
        async.forever(function(next) {
            Tenant.find({})
                .sort({
                    'timestamp.createdOn': 1
                })
                .exec(function(err, tenants) {
                    if (!err) {
                        async.eachSeries(tenants, function(file, callback) {
                            counterValue(function(error, result) {
                                var temp = JSON.parse(JSON.stringify(classification));
                                temp.classificationId = result;
                                temp.tenantRef = file._id;
                                var classificationData = new Classification(temp);
                                classificationData.save(function(err, res) {
                                    setTimeout(function() {
                                        callback();
                                    }, 0);
                                });
                            });
                        }, function(err) {
                            if (err) {
                                console.log(err);
                            } else {

                            }
                        });

                    } else {
                        reply(Boom.badImplementation(err)); // 500 error
                    }
                });
            ++i;
            if (i === 100) {
                console.log('Record Successfully created');
                return reply("Record Successfully created");
            }
            next();

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
        collectionName: 'classification',
        fieldName: 'classificationId'
    }, {
        $inc: {
            counterValue: 1
        }
    }, function(err, result) {
        if (err) console.log(err);
        else {
            if (result == 0) {
                counter = new Counter({
                    'collectionName': 'classification',
                    'fieldName': 'classificationId',
                    'counterValue': 0
                });
                counter.save(function(err, res) {
                    var classificationId = "cl" + res.counterValue;
                    callback(err, classificationId);
                });
            } else {
                Counter.findOne({
                    collectionName: 'classification',
                    fieldName: 'classificationId'
                }, function(err, res) {
                    if (res) {
                        var classificationId = "cl" + res.counterValue;
                        callback(err, classificationId);
                    }
                })
            }
        }
    });
}