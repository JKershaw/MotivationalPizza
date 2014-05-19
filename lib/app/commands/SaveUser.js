module.exports = function (clock, usersRepository) {

	function saveUser(user, callback) {

		user.registeredAt = clock.getTime();

		usersRepository.save(user, function () {
			callback(false);
		});

	}

	return {
		saveUser: saveUser
	};
};