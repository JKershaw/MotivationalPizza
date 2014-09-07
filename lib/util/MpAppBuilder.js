var UsersRepository = require('../repositories/UsersRepository'),
	MpApp = require("../app/MpApp");

module.exports = function () {

	function build(customUsersRepository) {
		var usersRepository = customUsersRepository || new UsersRepository();

		mpApp = new MpApp(usersRepository);

		return mpApp;
	}

	return {
		build: build
	};
};