'use strict';

const authorizer = require('./authorizer');
const policy = {};

// Proceeds with generating an IAM policy if token validates; errors otherwise.
policy.generatePolicy = (token, methodArn) => {
	if (authorizer.decodeToken(token) != null) {
		console.log('Token has been validated.');

		return generatePolicy('admin', 'Allow', methodArn);
	} else {
		console.log('ERROR: Token validation failed.');

		return new Error('Unauthorized');
	}
}

// Help function to generate an IAM policy
function generatePolicy(principalId, effect, methodArn) {
    const authResponse = {};
    
    authResponse.principalId = principalId;
    if (effect && methodArn) {
        const policyDocument = {};
        const statementOne = {};

        policyDocument.Version = '2012-10-17'; 
        policyDocument.Statement = [];      
        statementOne.Action = 'execute-api:Invoke'; 
        statementOne.Effect = effect;
        statementOne.Resource = methodArn;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    
    // Optional output with custom properties of the String, Number or Boolean type.
    authResponse.context = {
        "stringKey": "stringval",
        "numberKey": 123,
        "booleanKey": true
    };

    return authResponse;
}

module.exports = policy;