// Load modules

var Attribute = require('./controllers/attribute'),
    AttributeSection = require('./controllers/attributeSection'),
	Classification = require('./controllers/classification'),
	ClassificationGroup = require('./controllers/classificationGroup'),
	Tenant = require('./controllers/tenant');

// API Server Endpoints
exports.endpoints = [

    { method: 'POST', path: '/createAttributeSection', config: AttributeSection.CreateAttributeSection },
    { method: 'POST', path: '/createAttribute', config: Attribute.CreateAttribute },
    { method: 'POST', path: '/createTenants', config: Tenant.CreateTenantData},
    { method: 'POST', path: '/createClassification', config: Classification.CreateClassification },
    { method: 'POST', path: '/createClassificationGroup', config: ClassificationGroup.CreateClassificationGroup},
    { method: 'POST', path: '/createClassificationGroupChild', config: ClassificationGroup.CreateClassificationGroupChild},
    { method: 'POST', path: '/createClassificationGroupSubChild', config: ClassificationGroup.CreateClassificationGroupSubChild}
];