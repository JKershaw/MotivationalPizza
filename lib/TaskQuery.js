var mongojs = require('mongojs'),
	db = mongojs.connect(process.env.MONGO_CONNECTION_STRING, ["tasks"]),
	TasksRepository = require('./TasksRepository');

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

	function findById(id, callback) {

		var ObjectId = mongojs.ObjectId,
			query = {
				"_id": ObjectId(String(id))
			};

		tasksRepository.findOne(query, callback);
	}

	function findByText(text, callback) {

		var query = {
			text: text
		};

		tasksRepository.findOne(query, callback);
	}

	return {
		all: all,
		allWithStatus: allWithStatus,
		findByText: findByText,
		findById: findById
	};

};