require('date-utils');

var TasksRepository = require('./TasksRepository');

module.exports = function () {

	var tasksRepository = new TasksRepository();

	function all(callback) {
		tasksRepository.find({}, callback);
	}

	function allWithStatus(status, callback) {

		var query = {
			status: status
		};

		tasksRepository.find(query, callback);
	}

	function doneToday(callback) {

		var query = {
				status: "done",
				completedAt: {
					$gte: calulateDailyCutoff()
				}
			};

		tasksRepository.find(query, callback);
	}

	function doneBeforeToday(callback) {

		var query = {
				status: "done",
				completedAt: {
					$lt: calulateDailyCutoff()
				}
			};

		tasksRepository.find(query, callback);
	}

	function findById(id, callback) {

		var query = {
			"_id": tasksRepository.buildId(id)
		};

		tasksRepository.findOne(query, callback);
	}

	function findByText(text, callback) {

		var query = {
			text: text
		};

		tasksRepository.findOne(query, callback);
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
		calulateDailyCutoff: calulateDailyCutoff
	};

};