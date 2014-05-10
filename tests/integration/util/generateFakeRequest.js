var crypto = require('crypto');

module.exports = function () {
	var fakeRequest = {
		user: {
			_id: crypto.randomBytes(20).toString('hex')
		}
	};

	return fakeRequest;
};