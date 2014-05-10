var TasksRepository = require('./repositories/TasksRepository'),
	TaskQuery = require('./TaskQuery'),
	MpApp = require('./app/MpApp'),
	async = require('async');

module.exports = function (request) {

	var tasksRepository = new TasksRepository(),
		taskQuery = new TaskQuery(request),
		mpApp = new MpApp(tasksRepository);

	var userId = "";

	if (request.user) {
		userId = request.user._id
	}

	function add(newTask, callback) {
		taskObjectFactory(newTask, function (task) {
			mpApp.command.add(task, callback);
		});
	}

	function remove(id, callback) {
		taskQuery.findById(id, function (task) {
			if (!task) {
				return callback(false);
			}
			mpApp.command.remove(task, callback);
		});
	}

	function markAsToday(id, callback) {
		taskQuery.findById(id, function (task) {
			if (!task) {
				return callback(false);
			}
			mpApp.command.markAsToday(task, callback);
		});
	}

	function markAsDone(id, callback) {
		taskQuery.findById(id, function (task) {
			if (!task) {
				return callback(false);
			}
			mpApp.command.markAsDone(task, callback);
		});
	}

	function markAsNotToday(id, callback) {
		taskQuery.findById(id, function (task) {
			if (!task) {
				return callback(false);
			}
			mpApp.command.markAsNotToday(task, callback);
		});
	}

	function markAsTomorrow(id, callback) {
		taskQuery.findById(id, function (task) {
			if (!task) {
				return callback(false);
			}
			mpApp.command.markAsTomorrow(task, callback);
		});
	}

	function updateText(id, text, callback) {

		var query = tasksRepository.buildQuery(id, userId),
			updateRequest = {
				text: text
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

	function updateTag(id, tagsText, callback) {
		var query = tasksRepository.buildQuery(id, userId),
			updateRequest = {
				tags: []
			};

		tasksRepository.update(query, updateRequest, function () {
			tag(id, tagsText, callback);
		});
	}

	function tag(id, tagsText, callback) {

		taskQuery.findById(id, function (task) {
			if (!canTagTaskSpecification(task, tagsText)) {
				return callback(false);
			}

			var tags = convertTagsStringToTags(tagsText);

			var runningSuccess = false;

			async.eachSeries(tags, function (tag, done) {
				tagSingle(task, tag, function (success) {
					runningSuccess = runningSuccess || success;
					done();
				});
			}, function () {
				callback(runningSuccess);
			});
		});

	}

	function tagSingle(task, tag, callback) {

		if (!canTagTaskSpecification(task, tag.text)) {
			return callback(false);
		}

		task.tags.push({
			text: tag.text
		});

		var query = tasksRepository.buildQuery(task._id, userId),
			updateRequest = {
				tags: task.tags
			};

		tasksRepository.update(query, updateRequest, function () {
			callback(true);
		});
	}

	function convertTagsStringToTags(tagsString) {
		var tagTextArray = tagsString.split(',')
		tags = [];

		for (var i = 0; i < tagTextArray.length; i++) {

			var tagText = tagTextArray[i].replace(/^\s+|\s+$/g, '');

			tags.push({
				text: tagText
			});
		}

		return tags;
	}

	function taskObjectFactory(newTask, callback) {

		var text = newTask.text,
			tags = [];

		if (newTask.tagsString && newTask.tagsString.length > 0) {
			tags = convertTagsStringToTags(newTask.tagsString);
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