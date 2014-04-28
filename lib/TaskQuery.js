var mongojs = require('mongojs'),
	db = mongojs.connect(process.env.MONGO_CONNECTION_STRING, ["tasks"]);

module.exports = function () {

	function all(callback) {

		db.tasks.find({}).toArray(function (err, allTasks) {
			callback(allTasks);
		});
	}

	function find(text, callback) {
		db.tasks.find({text: text}).toArray(function (err, allTasks) {
			callback(allTasks[0]);
		});
	}

	return {
		all: all,
		find: find
	};

};