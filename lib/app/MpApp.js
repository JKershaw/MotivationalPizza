var EventStore = require('./EventStore'),
	Clock = require('./util/Clock');

module.exports = function (tasksRepository, usersRepository) {

	var clock = new Clock(),
		eventStore = new EventStore(clock);

	return {
		command: new require('./Command')(eventStore, clock, tasksRepository, usersRepository),
		query: new require('./Query')(eventStore, tasksRepository, usersRepository)
	};
};