var bcrypt = require('bcrypt-nodejs');

module.exports = function (usersRepository) {

	function generateHash(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	}

	function validPassword(realPassword, enteredPassword) {
		return bcrypt.compareSync(realPassword, enteredPassword);
	}

	function findById(id, callback) {
		usersRepository.findById(id, function (user) {
			callback(false, user);
		});
	}

	function findByPhoneNumber(phoneNumber, callback) {
		
		var phoneNumberWithoutRegionCode = phoneNumber.substr(3);
		usersRepository.findByPhoneNumber(phoneNumberWithoutRegionCode, function (user) {
			if (!user) {
				user = false;
			}
			callback(user);
		});
	}

	function findOne(username, callback) {
		usersRepository.findByUsername(username, function (user) {
			callback(false, user);
		});
	}

	function save(username, password, callback) {

		var user = userObjectFactory(username, password);
		usersRepository.save(user, function () {
			callback(false);
		});
	}

	function userObjectFactory(username, password) {

		password = generateHash(password);

		var taskObect = {
			username: username,
			password: password,
			registeredAt: new Date().getTime()
		};

		return taskObect;

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
		generateHash: generateHash,
		validPassword: validPassword,
		findById: findById,
		findOne: findOne,
		save: save,
		updatePhoneNumber: updatePhoneNumber,
		findByPhoneNumber: findByPhoneNumber,
		updateMaxTodayTaskCount: updateMaxTodayTaskCount
	};
};