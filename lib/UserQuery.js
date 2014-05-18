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

	return {
		generateHash: generateHash,
		validPassword: validPassword,
		findById: findById,
		findOne: findOne,
		findByPhoneNumber: findByPhoneNumber
	};
};