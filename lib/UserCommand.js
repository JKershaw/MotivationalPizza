var bcrypt = require('bcrypt-nodejs'),
	UserObjectFactory = require("./objectFactories/UserObjectFactory");

module.exports = function (usersRepository) {

	function validPassword(realPassword, enteredPassword) {
		return bcrypt.compareSync(realPassword, enteredPassword);
	}

	function save(username, password, callback) {

		var userObjectFactory = new UserObjectFactory();

		userObjectFactory.build(username, password, function (user) {
			usersRepository.save(user, function () {
				callback(false);
			});
		});
	}

	function updatePhoneNumber(userAccount, phoneNumber, callback) {

		var query = usersRepository.buildQuery(userAccount._id),
			updateRequest = {
				phoneNumber: phoneNumber
			};

		usersRepository.update(query, updateRequest, function () {
			callback();
		});
	}

	function updateMaxTodayTaskCount(userAccount, maxTodayTaskCount, callback) {

		maxTodayTaskCount = parseInt(maxTodayTaskCount, 10);

		var query = usersRepository.buildQuery(userAccount._id),
			updateRequest = {
				maxTodayTaskCount: maxTodayTaskCount
			};

		usersRepository.update(query, updateRequest, function () {
			callback();
		});
	}

	return {
		validPassword: validPassword,
		save: save,
		updatePhoneNumber: updatePhoneNumber,
		updateMaxTodayTaskCount: updateMaxTodayTaskCount
	};
};