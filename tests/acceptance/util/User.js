var crypto = require('crypto');

module.exports = function () {
	function signup(browser, done) {

		var username = crypto.randomBytes(20).toString('hex'),
			password = crypto.randomBytes(20).toString('hex');

		browser.visit('/signup', function () {
			console.log("Signing up as ", username);
			
			browser.fill('#username', username);
			browser.fill('#password', password);
			browser.pressButton("#signup", done);
		});
	}

	return {
		signup: signup
	};
};