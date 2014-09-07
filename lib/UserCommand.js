var UserObjectFactory = require("./objectFactories/UserObjectFactory");

module.exports = function (usersRepository) {

	function save(username, password, callback) {

		var userObjectFactory = new UserObjectFactory();

		userObjectFactory.build(username, password, function (user) {

			user.registeredAt = new Date().getTime();

			usersRepository.save(user, function () {
				callback(false);
			});
		});
	}

	return {
		save: save
	};
};