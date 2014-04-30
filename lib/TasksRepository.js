var mongojs = require('mongojs'),
	db = mongojs.connect(process.env.MONGO_CONNECTION_STRING, ["tasks"]);

module.exports = function () {

	function find(query, callback) {
		db.tasks.find(query).toArray(function (err, allTasks) {
			callback(allTasks);
		});
	}

	return {
		find: find
	};
};