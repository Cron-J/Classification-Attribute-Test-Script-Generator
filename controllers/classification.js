var Boom = require('boom'),
    Classification = require('../models/classification').Classification,
    Tenant   = require('../models/tenant').Tenant,
    async = require('async'),
    Common = require('./common'),
    classification = require('../config/testData').classification;

exports.CreateClassification = {
  handler: function (request, reply) {
    var i = 0;
    console.log('Wait until you see success message');
    async.forever(function(next) {
        Tenant.find({})
        .sort({'timestamp.createdOn': 1})
        .exec(function(err, tenants) {           
            if (!err) {
                async.eachSeries(tenants, function(file, callback) {                  
                        var localdata = classification;
                        localdata.tenantRef =  file._id;
                        var classificationData = new Classification(localdata);
                        classificationData.save(function(err, classification) {
                            setTimeout( function() {
                                callback();
                            }, 0 );
                        });
                        
                 
                }, function(err){
                    if( err ) {
                        console.log(err);
                    } else {
                         
                    }
                });
                
            } else {
                reply(Boom.badImplementation(err)); // 500 error
            }
        });
            ++i;
            if( i === 100 ) {
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

