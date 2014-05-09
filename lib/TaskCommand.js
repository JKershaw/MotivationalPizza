var TasksRepository = require('./TasksRepository'),
	TaskQuery = require('./TaskQuery'),
	async = require('async');

module.exports = function (request) {

	var tasksRepository = new TasksRepository(),
		taskQuery = new TaskQuery(request);

	var userId = "";

	if (request.user) {
		userId = request.user._id
	}

	function add(newTask, callback) {

		canAddTaskToDaySpecification(function (canMakeTaskToday) {
			if (!canMakeTaskToday) {
				return callback(false);
			}

			taskObjectFactory(newTask, function (taskObect) {
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

	function markAsTomorrow(id, callback) {

		updateStatus(id, "tomorrow", function () {
			callback(true);
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

	function tag(id, tagsText, callback) {

		taskQuery.findById(id, function (task) {
			if (!canTagTaskSpecification(task, tagsText)) {
				return callback(false);
			}

			var tagTextArray = convertTagsStringToTags(tagsText);

			var runningSuccess = false;

			async.eachSeries(tagTextArray, function (tagText, done) {
				tagSingle(id, tagText, function (success) {
					runningSuccess = runningSuccess || success;
					done();
				});
			}, function () {
				callback(runningSuccess);
			});
		});

	}

	function tagSingle(id, tagText, callback) {

		taskQuery.findById(id, function (task) {

			if (!canTagTaskSpecification(task, tagText)) {
				return callback(false);
			}

			task.tags.push({
				text: tagText
			});

			var query = tasksRepository.buildQuery(id, userId),
				updateRequest = {
					tags: task.tags
				};

			tasksRepository.update(query, updateRequest, function () {
				callback(true);
			});
		});
	}

	function updateTag(id, tagsText, callback) {
		var query = tasksRepository.buildQuery(id, userId),
			updateRequest = {
				tags: []
			};

		tasksRepository.update(query, updateRequest, function () {
			tag(id, tagsText, callback);
		});
	}

	function convertTagsStringToTags(tagsString) {
		var tagTextArray = tagsString.split(',');

		for (var i = 0; i < tagTextArray.length; i++) {
			tagTextArray[i] = tagTextArray[i].replace(/^\s+|\s+$/g, '');
		}

		return tagTextArray;
	}

	function taskObjectFactory(newTask, callback) {

		var text = newTask.text,
			tags = [];

		if (newTask.tagsString && newTask.tagsString.length > 0) {
			tagsStringArray = convertTagsStringToTags(newTask.tagsString);

			for (var i = 0; i < tagsStringArray.length; i++) {
				tags.push({
					text: tagsStringArray[i]
				});
			}
		}

		var taskObect = {
			text: text,
			status: "open",
			bumpedAt: new Date().getTime(),
			user: userId,
			tags: tags
		};

		callback(taskObect);
	}

	function canAddTaskToDaySpecification(callback) {
		taskQuery.allWithStatus("open", function (todayTasks) {
			callback(todayTasks.length < 5);
		});
	}

	function canTagTaskSpecification(task, tagText) {

		if (!tagText || tagText.length < 1) {
			return false;
		}

		var tags = task.tags;

		for (var i = 0; i < tags.length; i++) {
			if (tags[i].text == tagText) {
				return false;
			}
		}

		return true;
	}

	return {
		add: add,
		remove: remove,
		markAsDone: markAsDone,
		markAsNotToday: markAsNotToday,
		markAsToday: markAsToday,
		markAsTomorrow: markAsTomorrow,
		updateText: updateText,
		bump: bump,
		tag: tag,
		updateTag: updateTag
	};
};