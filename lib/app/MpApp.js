var EventStore = require('./EventStore'),
	Clock = require('./util/Clock'),
	CommandModuleLoader = require('./util/CommandModuleLoader');


module.exports = function (usersRepository, injectedEventStore, injectedCommandModuleLoader) {

	var repositories = {
		users: usersRepository
	};

	var clock = new Clock(),
		eventStore = injectedEventStore || new EventStore(clock),
		commandModuleLoader = injectedCommandModuleLoader || new CommandModuleLoader(clock, repositories);

	function command(commandName, commandArguments, callback) {

		var commandModule = commandModuleLoader.load(commandName);

		eventStore.save(commandName, commandArguments, function () {
			commandModule.run(commandArguments, callback);
		});
	}

	return {
		command: command,
		query: new require('./Query')(eventStore, usersRepository)
	};
};