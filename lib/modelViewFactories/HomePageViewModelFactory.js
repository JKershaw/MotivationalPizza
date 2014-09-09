var Repository = require("../repositories/Repository");

module.exports = function (request) {

	function build(callback) {

		var dailyGoalsRepository = new Repository("dailyGoals");

		var incompleteGoalQuery = {
			"user_id": request.user._id.toString(),
			"complete": false
		}, completeGoalQuery = {
				"user_id": request.user._id.toString(),
				"complete": true
			};

		dailyGoalsRepository.find(incompleteGoalQuery, function (incompleteDailyGoals) {
			dailyGoalsRepository.find(completeGoalQuery, function (completeDailyGoals) {

				var model = {
					goals: {
						today: {
							incomplete: incompleteDailyGoals,
							complete: completeDailyGoals
						}
					}
				};

				callback(model);
			});
		});
	}

	return {
		build: build
	};
};