var TaskFactory = require("../objectFactories/TaskFactory");

module.exports = function (tasksRepository) {

	taskFactory = new TaskFactory();

	function allWithStatusByUserId(status, userId, callback) {
		tasksRepository.find({
			user: userId,
			status: status
		}, function (tasks) {
			taskFactory.buildSeveral(tasks, callback);
		});
	}

	return {
		allWithStatusByUserId: allWithStatusByUserId
	};
};