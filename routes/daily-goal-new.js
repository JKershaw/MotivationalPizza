var HomePageViewModelFactory = require("../lib/modelViewFactories/HomePageViewModelFactory"),
	PageRenderer = require("../lib/util/PageRenderer"),
	Repository = require("../lib/repositories/Repository");

module.exports = function (app) {

	app.post('/newGoalForToday', function (request, response) {

		var dailyGoalsRepository = new Repository("dailyGoals");

		var newDailyGoal = {
			text: request.body.newDailyGoalName,
			color: request.body.newDailyTaskColour,
			created_at: new Date().getTime(),
			complete: false,
			user_id: request.user._id
		};

		dailyGoalsRepository.save(newDailyGoal, function(){
			response.redirect("/");
		});
	});
};