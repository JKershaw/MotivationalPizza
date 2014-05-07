var TasksRepository = require('./TasksRepository'),
	TaskQuery = require('./TaskQuery');

module.exports = function (request) {

	var tasksRepository = new TasksRepository(),
		taskQuery = new TaskQuery(request);

	var userId = "";

	if (request.user) {
		userId = request.user._id
	}

	function add(text, callback) {

		canAddTaskToDaySpecification(function (canMakeTaskToday) {
			if (!canMakeTaskToday) {
				return callback(false);
			}

			taskObjectFactory(text, function (taskObect) {
				tasksRepository.save(taskObect, function () {
					callback(true);
				});
			});
		});

	}

	function remove(id, callback) {
		var remove_query = tasksRepository.buildQuery(id, userId);
		tasksRepository.remove(remove_query, callback);
	}

	function markAsDone(id, callback) {

		var query = tasksRepository.buildQuery(id, userId),
			updateRequest = {
				status: "done",
				completedAt: new Date().getTime()
			};

		tasksRepository.update(query, updateRequest, callback);

	}

	function markAsNotToday(id, callback) {
		updateStatus(id, "not-today", callback);

	}

	function markAsToday(id, callback) {

		canAddTaskToDaySpecification(function (canMakeTaskToday) {
			if (!canMakeTaskToday) {
				return callback(false);
			}

			updateStatus(id, "open", function () {
				callback(true);
			});
		});
	}

	function updateText(id, text, callback) {

		var query = tasksRepository.buildQuery(id, userId),
			updateRequest = {
				text: text
			};

		tasksRepository.update(query, updateRequest, callback);
	}

	function updateStatus(id, status, callback) {

		var query = tasksRepository.buildQuery(id, userId),
			updateRequest = {
				status: status
			};

		tasksRepository.update(query, updateRequest, callback);
	}

	function bump(id, callback) {

		var query = tasksRepository.buildQuery(id, userId),
			updateRequest = {
				bumpedAt: new Date().getTime()
			};

		tasksRepository.update(query, updateRequest, callback);

	}

	function tag(id, tagText, callback) {

		taskQuery.findById(id, function (task) {

			var tags = task.tags;

			for (var i = 0; i < tags.length; i++) {
				if (tags[i].text == tagText) {
					return callback(false);
				}
			}

			tags.push({
				text: tagText
			});

			var query = tasksRepository.buildQuery(id, userId),
				updateRequest = {
					tags: tags
				};

			tasksRepository.update(query, updateRequest, function () {
				callback(true);
			});
		});

	}

	function taskObjectFactory(text, callback) {

		var taskObect = {
			text: text,
			status: "open",
			bumpedAt: new Date().getTime(),
			user: userId,
			tags: []
		};

		callback(taskObect);

	}

	function canAddTaskToDaySpecification(callback) {
		taskQuery.allWithStatus("open", function (todayTasks) {
			callback(todayTasks.length < 5);
		});
	}

	return {
		add: add,
		remove: remove,
		markAsDone: markAsDone,
		markAsNotToday: markAsNotToday,
		markAsToday: markAsToday,
		updateText: updateText,
		bump: bump,
		tag: tag
	};
};