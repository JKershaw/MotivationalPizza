var TasksRepository = require('./repositories/TasksRepository'),
	MpApp = require('./app/MpApp'),
	DailyCutoffCalculator = require('./util/DailyCutoffCalculator');

module.exports = function (request) {

	var tasksRepository = new TasksRepository(),
		mpApp = new MpApp(tasksRepository);

	var userId = "";

	if (request.user) {
		userId = request.user._id;
	}

	function all(callback) {
		mpApp.query.allByUserId(userId, callback);
	}

	function allWithStatus(status, callback) {
		mpApp.query.allWithStatusByUserId(status, userId, callback);
	}

	function doneToday(callback) {
		mpApp.query.doneTodayByUserId(userId, callback);
	}

	function doneBeforeToday(callback) {
		mpApp.query.doneBeforeTodayByUserId(userId, callback);
	}

	function findById(id, failureCallback, sucessCallback) {
		mpApp.query.findByIdAndUserId(id, userId, function (task) {
			if (!task) {
				failureCallback(false);
			} else {
				sucessCallback(task);
			}
		});
	}

	function findByText(text, callback) {
		mpApp.query.findByTextAndUserId(text, userId, function (task) {
			if (!task) {
				task = false;
			}
			callback(task);
		});
	}

	function allTags(callback) {
		all(function (tasks) {

			var allTags = [];

			tasks.forEach(function (task) {
				if (task.tags) {
					allTags = allTags.concat(task.tags);
				}
			});

			var tags = filterTags(allTags);

			callback(tags);

		});
	}

	function filterTags(allTags) {
		var tags = [];

		allTags.forEach(function (newTag) {

			var foundTag = false;

			for (var i = 0; i < tags.length; i++) {
				if (tags[i] && tags[i].text == newTag.text) {
					foundTag = true;
				}
			}

			if (!foundTag) {
				tags.push(newTag);
			}

		});

		return tags;
	}

	return {
		all: all,
		allWithStatus: allWithStatus,
		findByText: findByText,
		findById: findById,
		doneToday: doneToday,
		doneBeforeToday: doneBeforeToday,
		allTags: allTags
	};

};