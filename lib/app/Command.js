var Add = require("./commands/Add"),
	Remove = require("./commands/Remove");

module.exports = function (tasksRepository) {

	function add(task, callback) {
		new Add(tasksRepository).add(task, callback);
	}

	function remove(task, callback) {
		new Remove(tasksRepository).remove(task, callback);
	}

	return {
		add: add,
		remove: remove
	};
};