var Add = require("./commands/Add"),
	Remove = require("./commands/Remove"),
	MarkAsToday = require("./commands/MarkAsToday"),
	MarkAsDone = require("./commands/MarkAsDone"),
	MarkAsNotToday = require("./commands/MarkAsNotToday"),
	MarkAsTomorrow = require("./commands/MarkAsTomorrow"),
	UpdateText = require("./commands/UpdateText"),
	Bump = require("./commands/Bump"),
	AddTags = require("./commands/AddTags");

module.exports = function (tasksRepository, usersRepository) {

	function add(task, callback) {
		new Add(tasksRepository, usersRepository).add(task, callback);
	}

	function remove(task, callback) {
		new Remove(tasksRepository).remove(task, callback);
	}

	function markAsDone(task, callback) {
		new MarkAsDone(tasksRepository).markAsDone(task, callback);
	}

	function markAsToday(task, callback) {
		new MarkAsToday(tasksRepository, usersRepository).markAsToday(task, callback);
	}

	function markAsNotToday(task, callback) {
		new MarkAsNotToday(tasksRepository).markAsNotToday(task, callback);
	}

	function markAsTomorrow(task, callback) {
		new MarkAsTomorrow(tasksRepository).markAsTomorrow(task, callback);
	}

	function updateText(task, text, callback) {
		new UpdateText(tasksRepository).updateText(task, text, callback);
	}

	function bump(task, callback) {
		new Bump(tasksRepository).bump(task, callback);
	}

	function addTags(task, tags, callback) {
		new AddTags(tasksRepository).addTags(task, tags, callback);
	}

	return {
		add: add,
		remove: remove,
		markAsDone: markAsDone,
		markAsToday: markAsToday,
		markAsNotToday: markAsNotToday,
		markAsTomorrow: markAsTomorrow,
		updateText: updateText,
		bump: bump,
		addTags: addTags
	};
};