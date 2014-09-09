var HomePageViewModelFactory = require("../lib/modelViewFactories/HomePageViewModelFactory"),
	PageRenderer = require("../lib/util/PageRenderer");

module.exports = function (app) {

	app.post('/newGoalForToday', function (request, response) {

		response.redirect("/");

	});
};