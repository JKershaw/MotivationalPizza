var HomePageViewModelFactory = require("../lib/modelViewFactories/HomePageViewModelFactory"),
	PageRenderer = require("../lib/util/PageRenderer"),
	Repository = require("../lib/repositories/Repository");

module.exports = function (app) {

	app.get('/markDailyGoalAsCompleted/:id', function (request, response) {

		var dailyGoalsRepository = new Repository("dailyGoals");

		var updatedDailyGoal = {
			completed_at: new Date().getTime(),
			complete: true
		};

		var query = dailyGoalsRepository.buildQuery(request.params.id);

		dailyGoalsRepository.update(query, updatedDailyGoal, function () {
			response.redirect("/");
		});
	});
};