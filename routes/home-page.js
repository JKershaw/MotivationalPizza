var HomePageViewModelFactory = require("../lib/modelViewFactories/HomePageViewModelFactory"),
	PageRenderer = require("../lib/util/PageRenderer");

module.exports = function (app) {

	app.get('/', function (request, response) {

		var homePageViewModelFactory = new HomePageViewModelFactory(request),
			pageRenderer = new PageRenderer(request, response);

		homePageViewModelFactory.build(function (model) {
			pageRenderer.render("home-page.ejs", model);
		});
	});
};