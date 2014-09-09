var Repository = require("../repositories/Repository");

module.exports = function (request) {

	function build(callback) {

		var dailyGoalsRepository = new Repository("dailyGoals");

		dailyGoalsRepository.find({"user_id": request.user._id.toString(), "complete": false}, function (incompleteDailyGoals) {

			var completeDailyGoals = [{
				text: "Discover the moon",
				colour: "green"
			}];

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
	}

	return {
		build: build
	};
};