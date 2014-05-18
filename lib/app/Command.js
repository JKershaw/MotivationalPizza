var Add = require("./commands/Add"),
	Remove = require("./commands/Remove"),
	MarkAsToday = require("./commands/MarkAsToday"),
	MarkAsDone = require("./commands/MarkAsDone"),
	MarkAsNotToday = require("./commands/MarkAsNotToday"),
	MarkAsTomorrow = require("./commands/MarkAsTomorrow"),
	UpdateText = require("./commands/UpdateText"),
	Bump = require("./commands/Bump"),
	AddTags = require("./commands/AddTags");

module.exports = function (eventStore, tasksRepository, usersRepository) {

	function add(task, callback) {
		eventStore.save("addTask", {
			task: task
		}, function () {
			new Add(tasksRepository, usersRepository).add(task, callback);
		});
	}

	function remove(task, callback) {
		eventStore.save("removeTask", {
			task: task
		}, function () {
			new Remove(tasksRepository).remove(task, callback);
		});
	}

	function markAsDone(task, callback) {
		eventStore.save("markTaskAsDone", {
			task: task
		}, function () {
			new MarkAsDone(tasksRepository).markAsDone(task, callback);
		});
	}

	function markAsToday(task, callback) {
		eventStore.save("markTaskAsToday", {
			task: task
		}, function () {
			new MarkAsToday(tasksRepository, usersRepository).markAsToday(task, callback);
		});
	}

	function markAsNotToday(task, callback) {
		eventStore.save("markTaskAsNotToday", {
			task: task
		}, function () {
			new MarkAsNotToday(tasksRepository).markAsNotToday(task, callback);
		});
	}

	function markAsTomorrow(task, callback) {
		eventStore.save("markTaskAsTomorrow", {
			task: task
		}, function () {
			new MarkAsTomorrow(tasksRepository).markAsTomorrow(task, callback);
		});
	}

	function updateText(task, text, callback) {
		eventStore.save("updateTaskText", {
			task: task,
			text: text
		}, function () {
			new UpdateText(tasksRepository).updateText(task, text, callback);
		});
	}

	function bump(task, callback) {
		eventStore.save("bumpTask", {
			task: task
		}, function () {
			new Bump(tasksRepository).bump(task, callback);
		});
	}

	function addTags(task, tags, callback) {
		eventStore.save("addTaskTags", {
			task: task,
			tags: tags
		}, function () {
			new AddTags(tasksRepository).addTags(task, tags, callback);
		});
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