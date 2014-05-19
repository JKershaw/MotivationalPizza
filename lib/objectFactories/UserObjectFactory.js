var bcrypt = require('bcrypt-nodejs');

module.exports = function () {

	function build(username, password, callback) {

		password = generateHash(password);

		var userObect = {
			username: username,
			password: password
		};

		callback(userObect);

	}

	function generateHash(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	}

	return {
		build: build
	};
};