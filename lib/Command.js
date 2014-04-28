var mongojs = require('mongojs'),
	db = mongojs.connect(process.env.MONGO_CONNECTION_STRING, ["tasks"]);

module.exports = function () {

	function addTask(text, callback) {

		taskObect = {
			text: text
		};
		
		db.tasks.save(taskObect, function (err, saved) {
			callback();
		});
	}

	return {
		addTask: addTask
	};
};