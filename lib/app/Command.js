module.exports = function (eventStore, clock, repositories, commandModuleLoader) {

	function run(commandName, commandArguments, callback) {

		var commandModule = commandModuleLoader.load(commandName);

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
		run("TaskMarkAsDone", {
			task: task
		}, callback);
	}

	function markAsToday(task, callback) {
		run("TaskMarkAsToday", {
			task: task
		}, callback);
	}

	function markAsNotToday(task, callback) {
		run("TaskMarkAsSomeOtherTime", {
			task: task
		}, callback);
	}

	function markAsTomorrow(task, callback) {
		run("TaskMarkAsTomorrow", {
			task: task
		}, callback);
	}

	function updateText(task, text, callback) {
		run("TaskUpdateText", {
			task: task,
			text: text
		}, callback);
	}

	function bump(task, callback) {
		run("TaskBump", {
			task: task
		}, callback);
	}

	function addTags(task, tags, callback) {
		run("TaskAddTags", {
			task: task,
			tags: tags
		}, callback);
	}

	function saveUser(user, callback) {
		run("UserAdd", {
			user: user
		}, callback);
	}

	return {
		run: run,
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