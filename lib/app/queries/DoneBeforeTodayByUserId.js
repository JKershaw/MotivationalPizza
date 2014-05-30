var DailyCutoffCalculator = require('../util/DailyCutoffCalculator'),
	TaskFactory = require("../objectFactories/TaskFactory");

module.exports = function (tasksRepository) {

	taskFactory = new TaskFactory();
	
	function doneTodayByUserId(userId, callback) {
		var dailyCutoff = new DailyCutoffCalculator().calculate(),
			query = {
			status: "done",
			completedAt: {
				$lt: dailyCutoff
			},
			user: userId
		};

		tasksRepository.find(query, function (tasks) {
			taskFactory.buildSeveral(tasks, callback);
		});
	}

	return {
		doneTodayByUserId: doneTodayByUserId
	};
};