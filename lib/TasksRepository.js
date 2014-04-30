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

	return {
		find: find,
		findOne: findOne
	};
};