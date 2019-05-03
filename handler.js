'use strict';

const authorizer = require('./authorizer');
const policy = require('./policy');

exports.authorize = async (ev, ct, cb) => {
	const response = {};
	
	console.log('\nEVENT');
	// console.log(ev);

	try {
		const token = ev.authorizationToken;
		const methodArn = ev.methodArn;
		
		if (!token) {
			console.log('\nToken not found. \nGenerating new token...');
			
			response.body = generateToken(ev.body);
			
			console.log('\n' + response.body);
			
			return respond({ token: response.body, event: ev }, 200, cb);
		} else {
			console.log(`Token found: \n${token}`);
			
			response.body = generatePolicy(token, methodArn);
			
			console.log(`Policy generated: \n${response.body}`);
			
			return cb(null, response.body);
		}
	} catch (err) {
		return cb(err.message);
	}
};

function respond(body, statusCode, callback) {
	const response = {
		statusCode: statusCode,
		body: JSON.stringify(body)
	};

	callback(null, response);
}

function generateToken(payload) {
	return authorizer.generateToken(payload);
}

function generatePolicy(token, methodArn) {
	console.log(token);
	console.log(methodArn);

	return policy.generatePolicy(token, methodArn);
}