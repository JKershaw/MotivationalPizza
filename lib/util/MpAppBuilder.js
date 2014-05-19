var TasksRepository = require('../repositories/TasksRepository'),
	UsersRepository = require('../repositories/UsersRepository'),
	MpApp = require("../app/MpApp");

module.exports = function () {

	function build() {
		var tasksRepository = new TasksRepository(),
			usersRepository = new UsersRepository();

		mpApp = new MpApp(tasksRepository, usersRepository);

		return mpApp;
	}

	return {
		build: build
	};
};