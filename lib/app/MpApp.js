var Command = require('./Command'),
	Query = require('./Query'),
	EventStore = require('./EventStore');

module.exports = function (tasksRepository, usersRepository) {

	var clock = new Clock(),
		eventStore = new EventStore(clock);

	return {
		command: new Command(eventStore, clock, tasksRepository, usersRepository),
		query: new Query(eventStore, tasksRepository, usersRepository)
	};
};

function Clock() {

	function getTime() {
		return new Date().getTime();
	}

	return {
		getTime: getTime
	};
}