async = require('async');

var TaskQuery = require('./TaskQuery'),
	StringSplitter = require('./util/StringSplitter'),
	TaskObjectFactory = require('./objectFactories/TaskObjectFactory'),
	MpAppBuilder = require('./util/MpAppBuilder');

module.exports = function (request) {

	var taskQuery = new TaskQuery(request),
		mpApp = new MpAppBuilder().build();

	function add(newTask, callback) {

		var taskObjectFactory = new TaskObjectFactory(),
			userId = "";

		if (request.user) {
			userId = request.user._id;
		}

		taskObjectFactory.build(newTask, userId, function (task) {
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
		taskQuery.findById(id, function (task) {
			if (!task) {
				return callback(false);
			}
			mpApp.command.updateText(task, text, callback);
		});
	}

	function bump(id, callback) {
		taskQuery.findById(id, function (task) {
			if (!task) {
				return callback(false);
			}
			mpApp.command.bump(task, callback);
		});
	}

	function updateTag(id, tagsText, callback) {
		taskQuery.findById(id, function (task) {
			if (!task) {
				return callback(false);
			}
			task.tags = [];
			var tags = StringSplitter(tagsText);
			mpApp.command.addTags(task, tags, callback);
		});
	}

	function tag(id, tagsText, callback) {
		taskQuery.findById(id, function (task) {
			if (!task) {
				return callback(false);
			}
			var tags = StringSplitter(tagsText);
			mpApp.command.addTags(task, tags, callback);
		});
	}

	function split(id, newTasks, callback) {
		taskQuery.findById(id, function (task) {
			
			if (!task) {
				return callback(false);
			}

			newTasks[0].status = task.status;
			newTasks[1].status = task.status;

			add(newTasks[0], function (success) {
				if (!success) {
					return callback(false);
				}
				remove(task._id, function () {
					add(newTasks[1], callback);
				});
			});
		});
	}

	function markAllTomorrowAsToday(callback) {

		taskQuery.allWithStatus("tomorrow", function (tasks) {

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