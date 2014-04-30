var mongojs = require('mongojs'),
	db = mongojs.connect(process.env.MONGO_CONNECTION_STRING, ["tasks"]);

module.exports = function () {

	function all(callback) {

		db.tasks.find({}).toArray(function (err, allTasks) {
			callback(allTasks);
		});
	}

	function allWithStatus(status, callback) {

		db.tasks.find({status: status}).toArray(function (err, allTasks) {
			callback(allTasks);
		});
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
		db.tasks.find({text: text}).toArray(function (err, allTasks) {
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