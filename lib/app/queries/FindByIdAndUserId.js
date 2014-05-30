var TaskFactory = require("../objectFactories/TaskFactory");

module.exports = function (tasksRepository) {

	taskFactory = new TaskFactory();

	function findByIdAndUserId(taskId, userId, callback) {
		var query = {
			"_id": tasksRepository.buildId(taskId),
			user: userId
		};

		tasksRepository.findOne(query, function (task) {
			taskFactory.build(task, callback);
		});
	}

	return {
		findByIdAndUserId: findByIdAndUserId
	};
};