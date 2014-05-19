var EventStore = require('./EventStore'),
	Clock = require('./util/Clock'),
	CommandModuleLoader = require('./util/CommandModuleLoader');


module.exports = function (tasksRepository, usersRepository) {

	var repositories = {
		tasks: tasksRepository,
		users: usersRepository
	};

	var clock = new Clock(),
		eventStore = new EventStore(clock),
		commandModuleLoader = new CommandModuleLoader(clock, repositories);

	return {
		command: new require('./Command')(eventStore, clock, repositories, commandModuleLoader),
		query: new require('./Query')(eventStore, tasksRepository, usersRepository)
	};
};