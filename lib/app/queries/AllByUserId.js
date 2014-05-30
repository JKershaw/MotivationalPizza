TaskFactory = require("../objectFactories/TaskFactory");

module.exports = function (tasksRepository) {

	taskFactory = new TaskFactory();

	function allByUserId(userId, callback) {
		tasksRepository.find({
			user: userId
		}, function (tasks) {
			taskFactory.buildSeveral(tasks, callback);
		});
	}

	return {
		allByUserId: allByUserId
	};
};