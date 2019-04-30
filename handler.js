'use strict';

const authorizer = require('./authorizer');
const policy = require('./policy');

exports.handler = async (ev, ct, cb) => {
	const payload = ev.body;
	const token = ev.authorizationToken;
	
	if (!token) {
		return generateToken(ev.body);
	} else {
		return policy.generatePolicy(token, ev.methodArn);
	}
}

function generateToken(payload) {
	return authorizer.generateToken(payload);
}

function generatePolicy(token, methodArn) {
	return policy.generatePolicy(token, methodArn);
}