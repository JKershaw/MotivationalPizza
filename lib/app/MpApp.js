var Command = require('./Command'),
	Query = require('./Query');

module.exports = function (tasksRepository) {
	return {
		command: new Command(tasksRepository),
		query: new Query(tasksRepository)
	};
};