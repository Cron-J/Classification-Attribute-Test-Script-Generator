/**Helper function for update*/

exports.updateHelper = function(requestData, originalData) {       
    for(var req in requestData) 
        if(requestData[req] === " ") originalData[req] = " ";
        else originalData[req] = requestData[req];       
}
