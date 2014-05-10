require('date-utils');

var TasksRepository = require('./repositories/TasksRepository');

module.exports = function (request) {

	var tasksRepository = new TasksRepository();

	var userId = "";

	if (request.user) {
		userId = request.user._id
	}

	function all(callback) {
		tasksRepository.find({
			user: userId
		}, callback);
	}

	function allWithStatus(status, callback) {

		var query = {
			status: status,
			user: userId
		};

		tasksRepository.find(query, callback);
	}

	function doneToday(callback) {

		var query = {
			status: "done",
			completedAt: {
				$gte: calulateDailyCutoff()
			},
			user: userId
		};

		tasksRepository.find(query, callback);
	}

	function doneBeforeToday(callback) {

		var query = {
			status: "done",
			completedAt: {
				$lt: calulateDailyCutoff()
			},
			user: userId
		};

		tasksRepository.find(query, callback);
	}

	function findById(id, failureCallback, sucessCallback) {

		var query = {
			"_id": tasksRepository.buildId(id),
			user: userId
		};

		tasksRepository.findOne(query, function (task) {
			if (!task) {
				failureCallback(false);
			} else {
				sucessCallback(task);
			}
		});
	}

	function findByText(text, callback) {

		var query = {
			text: text,
			user: userId
		};

		tasksRepository.findOne(query, function (task) {
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
			};

			if (!foundTag) {
				tags.push(newTag);
			}

		});

		return tags;
	}

	function calulateDailyCutoff() {
		return Date.today().add({
			hours: 3
		}).getTime();
	}

	return {
		all: all,
		allWithStatus: allWithStatus,
		findByText: findByText,
		findById: findById,
		doneToday: doneToday,
		doneBeforeToday: doneBeforeToday,
		calulateDailyCutoff: calulateDailyCutoff,
		allTags: allTags
	};

};