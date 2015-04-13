var Boom = require('boom'),
    Status = require('../models/status').Status,
    async = require('async'),
    statusData = require('../config/testData').status;

exports.CreateStatus = {
    handler: function(request, reply) {
        console.log('Wait until you see success message');
        var i =0;
        async.each(statusData, function(file, callback) {
        	var status = new Status(file);
			status.save(function (err,status) {
		        if (!err) {
		        	i++;
		        	if (i === statusData.length){
		        		console.log('Record Successfully created');
                        return reply("Record Successfully created");
		        	}
		            callback();
		        } else {
		            reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
		        }
			});
        });
    }
}