var Add = require("./commands/Add"),
	Remove = require("./commands/Remove"),
	MarkAsToday = require("./commands/MarkAsToday"),
	MarkAsDone = require("./commands/MarkAsDone"),
	MarkAsNotToday = require("./commands/MarkAsNotToday"),
	MarkAsTomorrow = require("./commands/MarkAsTomorrow");

module.exports = function (tasksRepository) {

	function add(task, callback) {
		new Add(tasksRepository).add(task, callback);
	}

	function remove(task, callback) {
		new Remove(tasksRepository).remove(task, callback);
	}

	function markAsDone(task, callback) {
		new MarkAsDone(tasksRepository).markAsDone(task, callback);
	}

	function markAsToday(task, callback) {
		new MarkAsToday(tasksRepository).markAsToday(task, callback);
	}

	function markAsNotToday(task, callback) {
		new MarkAsNotToday(tasksRepository).markAsNotToday(task, callback);
	}

	function markAsTomorrow(task, callback) {
		new MarkAsTomorrow(tasksRepository).markAsTomorrow(task, callback);
	}

	return {
		add: add,
		remove: remove,
		markAsDone: markAsDone,
		markAsToday: markAsToday,
		markAsNotToday: markAsNotToday,
		markAsTomorrow: markAsTomorrow
	};
};