var bcrypt = require('bcrypt-nodejs'),
	UsersRepository = require('../repositories/UsersRepository');

module.exports = function () {

	var usersRepository = new UsersRepository();

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

		callback();
	}

	return {
		generateHash: generateHash,
		validPassword: validPassword,
		findById: findById,
		findOne: findOne,
		save: save,
		updatePhoneNumber: updatePhoneNumber
	};
};