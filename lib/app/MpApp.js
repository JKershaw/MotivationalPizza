var Command = require('./Command');

module.exports = function (tasksRepository) {
	return {
		command: new Command(tasksRepository)
	}
}