var Command = require('./Command'),
	Query = require('./Query'),
	EventStore = require('./EventStore');

module.exports = function (tasksRepository, usersRepository) {

	var eventStore = new EventStore();
	
	return {
		command: new Command(eventStore, tasksRepository, usersRepository),
		query: new Query(eventStore, tasksRepository, usersRepository)
	};
};