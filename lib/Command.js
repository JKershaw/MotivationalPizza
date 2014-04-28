var mongojs = require('mongojs'),
	db = mongojs.connect(process.env.MONGO_CONNECTION_STRING, ["tasks"]);

module.exports = function () {

	function addTask(text, callback) {

		var taskObect = taskObjectBuilder(text);

		db.tasks.save(taskObect, function (err, saved) {
			callback();
		});
	}

	function taskObjectBuilder(text) {

		var taskObect = {
			text: text
		};

		return taskObect;
	}

	return {
		addTask: addTask
	};
};