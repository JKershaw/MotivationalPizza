async = require('async');

var TasksRepository = require('./repositories/TasksRepository'),
	TaskQuery = require('./TaskQuery'),
	MpApp = require('./app/MpApp');

module.exports = function (request) {

	var tasksRepository = new TasksRepository(),
		taskQuery = new TaskQuery(request),
		mpApp = new MpApp(tasksRepository);

	var userId = "";

	if (request.user) {
		userId = request.user._id;
	}

	function add(newTask, callback) {
		taskObjectFactory(newTask, function (task) {
			mpApp.command.add(task, callback);
		});
	}

	function remove(id, callback) {
		taskQuery.findById(id, callback, function (task) {
			mpApp.command.remove(task, callback);
		});
	}

	function markAsToday(id, callback) {
		taskQuery.findById(id, callback, function (task) {
			mpApp.command.markAsToday(task, callback);
		});
	}

	function markAsDone(id, callback) {
		taskQuery.findById(id, callback, function (task) {
			mpApp.command.markAsDone(task, callback);
		});
	}

	function markAsNotToday(id, callback) {
		taskQuery.findById(id, callback, function (task) {
			mpApp.command.markAsNotToday(task, callback);
		});
	}

	function markAsTomorrow(id, callback) {
		taskQuery.findById(id, callback, function (task) {
			mpApp.command.markAsTomorrow(task, callback);
		});
	}

	function updateText(id, text, callback) {
		taskQuery.findById(id, callback, function (task) {
			mpApp.command.updateText(task, text, callback);
		});
	}

	function bump(id, callback) {
		taskQuery.findById(id, callback, function (task) {
			mpApp.command.bump(task, callback);
		});
	}

	function updateTag(id, tagsText, callback) {
		taskQuery.findById(id, callback, function (task) {
			task.tags = [];
			var tags = convertTagsStringToTags(tagsText);
			mpApp.command.addTags(task, tags, callback);
		});
	}

	function tag(id, tagsText, callback) {
		taskQuery.findById(id, callback, function (task) {
			var tags = convertTagsStringToTags(tagsText);
			mpApp.command.addTags(task, tags, callback);
		});
	}

	function split(id, newTasks, callback) {
		taskQuery.findById(id, callback, function (task) {

			newTasks[0].status = task.status;
			newTasks[1].status = task.status;

			taskObjectFactory(newTasks[0], function (newTask1) {
				taskObjectFactory(newTasks[1], function (newTask2) {

					mpApp.command.add(newTask1, function (success) {

						if (success) {

							mpApp.command.remove(task, function () {
								mpApp.command.add(newTask2, callback);
							});
						} else {
							callback(false);
						}
					});
				});
			});
		});
	}

	function convertTagsStringToTags(tagsString) {
		var tagTextArray = tagsString.split(',');
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
			tags = [],
			status = "open";

		if (newTask.tagsString && newTask.tagsString.length > 0) {
			tags = convertTagsStringToTags(newTask.tagsString);
		}

		if (newTask.status) {
			status = newTask.status;
		}

		var taskObect = {
			text: text,
			status: status,
			bumpedAt: new Date().getTime(),
			user: userId,
			tags: tags
		};

		callback(taskObect);
	}

	function markAllTomorrowAsToday(callback) {

		mpApp.query.allWithStatusByUserId("tomorrow", userId, function (tasks) {

			async.eachSeries(tasks, function (task, done) {
				mpApp.command.markAsToday(task, function () {
					done();
				});
			}, function () {
				callback(true);
			});

		});
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
		updateTag: updateTag,
		markAllTomorrowAsToday: markAllTomorrowAsToday,
		split: split
	};
};