var TaskFactory = require("../objectFactories/TaskFactory");

module.exports = function (tasksRepository) {

	taskFactory = new TaskFactory();

	function findByTextAndUserId(text, userId, callback) {
		var query = {
			text: text,
			user: userId
		};

		tasksRepository.findOne(query, function (task) {
			taskFactory.build(task, callback);
		});
	}

	return {
		findByTextAndUserId: findByTextAndUserId
	};
};