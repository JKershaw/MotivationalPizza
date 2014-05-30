async = require('async');

var TaskQuery = require('./TaskQuery'),
	StringSplitter = require('./util/StringSplitter'),
	TaskObjectFactory = require('./objectFactories/TaskObjectFactory'),
	MpAppBuilder = require('./util/MpAppBuilder');

module.exports = function (request) {

	var taskQuery = new TaskQuery(request),
		mpApp = new MpAppBuilder().build(),
		taskObjectFactory = new TaskObjectFactory();

	function add(taskDetails, callback) {

		var userId = "";

		if (request.user) {
			userId = request.user._id;
		}

		taskObjectFactory.build(taskDetails, userId, function (task) {
			mpApp.command("TaskAdd", {
				task: task
			}, callback);
		});
	}

	function update(id, taskDetails, callback) {

		var userId = "";

		if (request.user) {
			userId = request.user._id;
		}

		taskQuery.findById(id, function (oldTask) {

			if (!oldTask) {
				return callback(false);
			}

			taskObjectFactory.build(taskDetails, userId, function (newTask) {

				var task = oldTask;
				task.text = newTask.text;
				task.tags = newTask.tags;
				task.status = newTask.status;
				task.dueDate = newTask.dueDate;

				mpApp.command("TaskUpdateDueDate", {
					task: task,
					dueDate: task.dueDate
				}, function () {
					mpApp.command("TaskUpdateText", {
						task: task,
						text: task.text
					}, function () {
						mpApp.command("TaskAddTags", {
							task: task,
							tags: task.tags
						}, function () {

							var command;

							if (newTask.status == "open") {
								command = "TaskMarkAsToday";
							}

							if (newTask.status == "tomorrow") {
								command = "TaskMarkAsTomorrow";
							}

							if (newTask.status == "not-today") {
								command = "TaskMarkAsSomeOtherTime";
							}

							mpApp.command(command, {
								task: task
							}, callback);

						});
					});
				});

			});
		});
	}

	function remove(id, callback) {
		taskQuery.findById(id, function (task) {
			if (!task) {
				return callback(false);
			}
			mpApp.command("TaskRemove", {
				task: task
			}, callback);
		});
	}

	function markAsToday(id, callback) {
		taskQuery.findById(id, function (task) {
			if (!task) {
				return callback(false);
			}
			mpApp.command("TaskMarkAsToday", {
				task: task
			}, callback);
		});
	}

	function markAsDone(id, callback) {
		taskQuery.findById(id, function (task) {
			if (!task) {
				return callback(false);
			}
			mpApp.command("TaskMarkAsDone", {
				task: task
			}, callback);
		});
	}

	function markAsNotToday(id, callback) {
		taskQuery.findById(id, function (task) {
			if (!task) {
				return callback(false);
			}
			mpApp.command("TaskMarkAsSomeOtherTime", {
				task: task
			}, callback);
		});
	}

	function markAsTomorrow(id, callback) {
		taskQuery.findById(id, function (task) {
			if (!task) {
				return callback(false);
			}
			mpApp.command("TaskMarkAsTomorrow", {
				task: task
			}, callback);
		});
	}

	function bump(id, callback) {
		taskQuery.findById(id, function (task) {
			if (!task) {
				return callback(false);
			}
			mpApp.command("TaskBump", {
				task: task
			}, callback);
		});
	}

	function split(id, newTasks, callback) {
		taskQuery.findById(id, function (task) {

			if (!task) {
				return callback(false);
			}

			var taskWhen = "today";

			if (task.status == "tomorrow") {
				taskWhen = "tomorrow";
			}

			if (task.status == "not-today") {
				taskWhen = "some-other-time";
			}

			newTasks[0]['task-when'] = taskWhen;
			newTasks[1]['task-when'] = taskWhen;

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
				mpApp.command("TaskMarkAsToday", {
					task: task
				}, function () {
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
		bump: bump,
		markAllTomorrowAsToday: markAllTomorrowAsToday,
		split: split,
		update: update
	};
};