dailyCutoffCalculator = require('../util/DailyCutoffCalculator');

module.exports = function (tasksRepository) {
	
	function doneTodayByUserId(userId, callback) {
		var dailyCutoff = new DailyCutoffCalculator().calculate(),
			query = {
			status: "done",
			completedAt: {
				$lt: dailyCutoff
			},
			user: userId
		};

		tasksRepository.find(query, callback);
	}

	return {
		doneTodayByUserId: doneTodayByUserId
	};
};