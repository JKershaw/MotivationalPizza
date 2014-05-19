var TasksRepository = require('../repositories/TasksRepository'),
	UsersRepository = require('../repositories/UsersRepository'),
	MpApp = require("../app/MpApp");

module.exports = function () {

	function build(customTasksRepository, customUsersRepository) {
		var tasksRepository = customTasksRepository || new TasksRepository(),
			usersRepository = customUsersRepository || new UsersRepository();

		mpApp = new MpApp(tasksRepository, usersRepository);

		return mpApp;
	}

	return {
		build: build
	};
};