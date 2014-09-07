var bcrypt = require('bcrypt-nodejs'),
	UserObjectFactory = require("./objectFactories/UserObjectFactory"),
	MpAppBuilder = require('./util/MpAppBuilder');

module.exports = function (usersRepository) {

	var mpApp = new MpAppBuilder().build();

	function validPassword(realPassword, enteredPassword) {
		return bcrypt.compareSync(realPassword, enteredPassword);
	}

	function save(username, password, callback) {

		var userObjectFactory = new UserObjectFactory();

		userObjectFactory.build(username, password, function (user) {
			mpApp.command("UserAdd", {
				user: user
			}, callback);
		});
	}

	function updatePhoneNumber(userAccount, phoneNumber, callback) {

		mpApp.command("UserUpdatePhoneNumber", {
			user: userAccount,
			phoneNumber: phoneNumber
		}, callback);

	}

	function updateUsPhoneNumber(userAccount, usPhoneNumber, callback) {

		mpApp.command("UserUpdateUsPhoneNumber", {
			user: userAccount,
			usPhoneNumber: usPhoneNumber
		}, callback);

	}

	function updateMaxTodayTaskCount(userAccount, maxTodayTaskCount, callback) {

		mpApp.command("UserUpdateMaxTodayTaskCount", {
			user: userAccount,
			maxTodayTaskCount: maxTodayTaskCount
		}, callback);

	}

	return {
		validPassword: validPassword,
		save: save,
		updatePhoneNumber: updatePhoneNumber,
		updateMaxTodayTaskCount: updateMaxTodayTaskCount,
		updateUsPhoneNumber: updateUsPhoneNumber
	};
};