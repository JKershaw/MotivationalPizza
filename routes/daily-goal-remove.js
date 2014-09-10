var HomePageViewModelFactory = require("../lib/modelViewFactories/HomePageViewModelFactory"),
	PageRenderer = require("../lib/util/PageRenderer"),
	Repository = require("../lib/repositories/Repository");

module.exports = function (app) {

	app.get('/removeDailyGoal/:id', function (request, response) {

		var dailyGoalsRepository = new Repository("dailyGoals");

		dailyGoalsRepository.remove(request.params.id, function () {
			response.redirect("/");
		});
	});
};