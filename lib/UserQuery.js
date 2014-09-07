var bcrypt = require('bcrypt-nodejs');

module.exports = function (usersRepository) {

	function validPassword(realPassword, enteredPassword) {
		return bcrypt.compareSync(realPassword, enteredPassword);
	}

	function findById(id, callback) {
		usersRepository.findById(id, function (user) {
			callback(false, user);
		});
	}


	function findOne(username, callback) {
		usersRepository.findByAttribute("username", username, function (user) {
			callback(false, user);
		});
	}

	return {
		validPassword: validPassword,
		findById: findById,
		findOne: findOne
	};
};