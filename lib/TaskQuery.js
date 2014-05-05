require('date-utils');

var TasksRepository = require('./TasksRepository');

module.exports = function (request) {

	var tasksRepository = new TasksRepository();

	var userId = "";

	if (request.user) {
		userId = request.user._id
	}


	function all(callback) {
		tasksRepository.find({user: userId}, callback);
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

	function findById(id, callback) {

		var query = {
			"_id": tasksRepository.buildId(id),
			user: userId
		};

		tasksRepository.findOne(query, callback);
	}

	function findByText(text, callback) {

		var query = {
			text: text,
			user: userId
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