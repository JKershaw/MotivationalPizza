var mongojs = require('mongojs'),
	db = mongojs.connect(process.env.MONGO_CONNECTION_STRING, ["tasks"]);

module.exports = function () {

	function find(query, callback) {
		
		db.tasks.find(query).toArray(function (err, allTasks) {
			callback(allTasks);
		});
	}

	function findOne(query, callback) {

		find(query, function (allTasks) {
			callback(allTasks[0]);
		});
	}

	function save(taskObect, callback) {
		
		db.tasks.save(taskObect, function (err, saved) {
			callback();
		});
	}

	function remove(query, callback) {
		
		db.tasks.remove(query, function () {
			callback();
		});
	}

	return {
		find: find,
		findOne: findOne,
		save: save,
		remove: remove
	};
};