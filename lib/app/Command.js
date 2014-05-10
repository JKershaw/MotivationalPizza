var Add = require("./commands/Add");

module.exports = function (tasksRepository) {

	function add(task, callback) {
		new Add(tasksRepository).add(task, callback);
	}

	return {
		add: add
	};
};