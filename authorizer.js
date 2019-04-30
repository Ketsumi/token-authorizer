'use strict';

const jwt = require('jsonwebtoken');
const SECRET_KEY = 'SuperSecretKey'
const authorizer = {};

authorizer.generateToken = payload => {
	const token = jwt.sign(payload, SECRET_KEY);

	return token;
};

authorizer.decodeToken = token => {
	try {
		const decoded = jwt.verify(token, SECRET_KEY);

		return decoded;
	} catch(err) {
		console.log(err);

		return null;
	}
};

module.exports = authorizer;