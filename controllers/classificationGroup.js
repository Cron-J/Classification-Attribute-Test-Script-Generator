var Boom = require('boom'),
    ClassificationGroup = require('../models/classificationGroup').ClassificationGroup,
    Attribute = require('../models/attribute').Attribute,
    Counter = require('../models/counter').Counter,
    async = require('async'),
    Classification = require('../models/classification').Classification,
    classificationGroupData = require('../config/testData').classificationGroup,
    Common = require('./common');


exports.CreateClassificationGroup = {
    handler: function(request, reply) {
        console.log('Wait until all data gets inserted');
        Attribute.find({})
            .exec(function(err, attribute) {
                if (!err) {
                    var arr = arrayCreator(1, 10);
                    async.eachSeries(arr, function(file, callback) {
                        Classification.find({})
                            .sort({
                                'timestamp.createdOn': 1
                            })
                            .exec(function(err, classification) {
                                if (!err) {
                                    async.eachSeries(classification, function(file, callback) {
                                        counterValue(function(result) {
                                            var localdata = JSON.parse(JSON.stringify(classificationGroupData));
                                            console.log("------------------------------------------");
                                            console.log("classificationGroupId:  "+result+" successfully inserted..");
                                            localdata.classificationGroupId = result;
                                            localdata.classificationRef = file._id;
                                            localdata.classGrp2Attributes = [];
                                            for (i = 0; i <= 5; i++) {
                                                var obj = {};
                                                obj['sortNo'] = Math.floor((Math.random() * 1000) + 1).toString();
                                                obj['grpId'] = Math.floor((Math.random() * 1000) + 1).toString();
                                                obj['attributeRef'] = attribute[Math.floor((Math.random() * 99) + 1)]._id;
                                                localdata.classGrp2Attributes.push(obj);
                                            }
                                            var classificationGroupParent = new ClassificationGroup(localdata);
                                            classificationGroupParent.save(function(err, classificationGroupParent) {
                                                setTimeout(function() {
                                                    if (classificationGroupParent.classificationGroupId == 9999) {
                                                        console.log('Record Successfully created');
                                                        return reply('Record Successfully created');
                                                    }
                                                    callback();
                                                }, 0);
                                            });
                                        });
                                    }, function(err) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            callback();
                                        }
                                    });

                                } else {
                                    reply(Boom.badImplementation(err)); // 500 error
                                }
                            });
                        callback();

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

    }
}

exports.CreateClassificationGroupChild = {
    handler: function(request, reply) {
        console.log('Wait until you see success message');
        Attribute.find({})
            .exec(function(err, attribute) {
                if (!err) {
                    ClassificationGroup.find({}, function(err, classificationGroup) {
                        if (!err) {
                            async.eachSeries(classificationGroup, function(classification, callback) {
                                counterValue(function(result) {
                                    var localdata = JSON.parse(JSON.stringify(classificationGroupData));
                                    console.log("------------------------------------------");
                                    console.log("classificationGroupId:  "+result+" successfully inserted..");
                                    localdata.classificationGroupId = result;
                                    localdata.parentClassificationGrpRef = classification._id;
                                    localdata.classificationRef = classification.classificationRef;
                                    localdata.classGrp2Attributes = [];
                                    for (i = 0; i <= 5; i++) {
                                        var obj = {};
                                        obj['sortNo'] = Math.floor((Math.random() * 1000) + 1).toString();
                                        obj['grpId'] = Math.floor((Math.random() * 1000) + 1).toString();
                                        obj['attributeRef'] = attribute[Math.floor((Math.random() * 99) + 1)]._id;
                                        localdata.classGrp2Attributes.push(obj);
                                    }
                                    var classificationGroupChild = new ClassificationGroup(localdata);
                                    classificationGroupChild.save(function(err, classification1) {
                                        setTimeout(function() {
                                            if (!err) {
                                                if (classification1.classificationGroupId == 9999 * 2) {
                                                    console.log('Record Successfully created');
                                                    return reply('Record Successfully created');
                                                }
                                                callback();
                                            } else console.log(err);

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

                } else {
                    reply(Boom.badImplementation(err)); // 500 error
                }
            });

    }
}

exports.CreateClassificationGroupSubChild = {
    handler: function(request, reply) {
        console.log('Wait until you see success message');
        Attribute.find({})
            .exec(function(err, attribute) {
                if (!err) {
                    ClassificationGroup.find({})
                        .exec(function(err, classificationGroup) {
                            if (!err) {
                                async.eachSeries(classificationGroup, function(classification, callback) {
                                    if (classification.parentClassificationGrpRef != undefined) {
                                        counterValue(function(result) {
                                            var localdata = JSON.parse(JSON.stringify(classificationGroupData));
                                            console.log("------------------------------------------");
                                            console.log("classificationGroupId:  "+result+" successfully inserted..");
                                            localdata.classificationGroupId = result;
                                            localdata.parentClassificationGrpRef = classification._id;
                                            localdata.classificationRef = classification.classificationRef;
                                            localdata.classGrp2Attributes = [];
                                            for (i = 0; i <= 5; i++) {
                                                var obj = {};
                                                obj['sortNo'] = Math.floor((Math.random() * 1000) + 1).toString();
                                                obj['grpId'] = Math.floor((Math.random() * 1000) + 1).toString();
                                                obj['attributeRef'] = attribute[Math.floor((Math.random() * 99) + 1)]._id;
                                                localdata.classGrp2Attributes.push(obj);
                                            }
                                            var classificationGroupChild = new ClassificationGroup(localdata);
                                            classificationGroupChild.save(function(err, classification1) {
                                                setTimeout(function() {
                                                    if (classification1.classificationGroupId == 9999 * 3) {
                                                        console.log('Record Successfully created');
                                                        return reply('Record Successfully created');
                                                    }
                                                    callback();
                                                }, 0);
                                            });
                                        });
                                    } else {
                                        setTimeout(function() {
                                            callback();
                                        }, 0);
                                    }

                                }, function(err) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log('Record Successfully created');
                                    }
                                });
                            } else {
                                reply(Boom.badImplementation(err)); // 500 error
                            }
                        });

                } else {

                }
            });

    }
}



function arrayCreator(i, maxval) {
    return [i].concat(i < maxval ? arrayCreator(i + 1, maxval) : []);
}

var counterValue = function(callback) {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 9;
    var randomstring = '';
    for (var i=0; i<string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
    }

    callback(randomstring);
}
