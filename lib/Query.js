var mongojs = require('mongojs'),
	db = mongojs.connect(process.env.MONGO_CONNECTION_STRING, ["tasks"]);

module.exports = function () {

	function allTasks(callback) {

		db.tasks.find({}).toArray(function (err, allTasks) {
			callback(allTasks);
		});
	}

	return {
		allTasks: allTasks
	};

};