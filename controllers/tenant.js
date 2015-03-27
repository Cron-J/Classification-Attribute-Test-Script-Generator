var Boom    = require('boom'),                                 // HTTP Errors
    Tenant   = require('../models/tenant').Tenant,
    tennant = require('../config/testData').tennant,
    async = require('async');
/** @module Controller for Tenant */


exports.CreateTenantData = {
  handler: function (request, reply) {
    console.log('Wait until you see success message');
    var i = 0;  
    async.forever(function(callback) {                  
            var tenant = new Tenant(tennant);
            tenant.save(function(err, result) {
                if(err) console.log(err);
                ++i;
                if ( i === 10){
                    console.log('Record Successfully created');
                    return reply("Record Successfully created");
                }
                callback();
            });
            
     
    }, function(err){
        if( err ) {
            console.log(err);
        } else {
            console.log('Record Successfully created');
        }
    });
  
  }
}

