var Command = require('./Command'),
	Query = require('./Query');

module.exports = function (tasksRepository, usersRepository) {
	return {
		command: new Command(tasksRepository, usersRepository),
		query: new Query(tasksRepository, usersRepository)
	};
};