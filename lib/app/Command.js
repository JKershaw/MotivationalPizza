var MarkAsToday = require("./commands/MarkAsToday"),
	MarkAsDone = require("./commands/MarkAsDone"),
	MarkAsNotToday = require("./commands/MarkAsNotToday"),
	MarkAsTomorrow = require("./commands/MarkAsTomorrow"),
	UpdateText = require("./commands/UpdateText"),
	Bump = require("./commands/Bump"),
	AddTags = require("./commands/AddTags"),
	SaveUser = require("./commands/SaveUser"),
	CommandModuleLoader = require('./util/CommandModuleLoader');

module.exports = function (eventStore, clock, tasksRepository, usersRepository) {

	var repositories = {
		tasks: tasksRepository,
		users: usersRepository
	};

	function run(commandName, commandArguments, callback) {

		var commandModule = CommandModuleLoader(commandName, clock, repositories);

		eventStore.save(commandName, commandArguments, function () {
			commandModule.run(commandArguments, callback);
		});
	}

	function add(task, callback) {
		run("TaskAdd", {
			task: task
		}, callback);
	}

	function remove(task, callback) {
		run("TaskRemove", {
			task: task
		}, callback);
	}

	function markAsDone(task, callback) {
		eventStore.save("markTaskAsDone", {
			task: task
		}, function () {
			new MarkAsDone(clock, tasksRepository).markAsDone(task, callback);
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
			new Bump(clock, tasksRepository).bump(task, callback);
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

	function saveUser(user, callback) {
		eventStore.save("saveUser", {
			user: user
		}, function () {
			new SaveUser(clock, usersRepository).saveUser(user, callback);
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
		addTags: addTags,
		saveUser: saveUser
	};
};