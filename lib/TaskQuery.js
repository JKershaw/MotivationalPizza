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

		db.tasks.find(query).toArray(function (err, allTasks) {
			callback(allTasks[0]);
		});
	}

	function find(text, callback) {
		db.tasks.find({
			text: text
		}).toArray(function (err, allTasks) {
			callback(allTasks[0]);
		});
	}

	return {
		all: all,
		allWithStatus: allWithStatus,
		find: find,
		findById: findById
	};

};