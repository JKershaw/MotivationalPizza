var HomePageViewModelFactory = require("../lib/modelViewFactories/HomePageViewModelFactory"),
	PageRenderer = require("../lib/util/PageRenderer");

module.exports = function (app) {

	app.get('/', function (request, response) {

		var homePageViewModelFactory = new HomePageViewModelFactory(request),
			pageRenderer = new PageRenderer(request, response);

		if (request.user) {
			homePageViewModelFactory.build(function (model) {
				pageRenderer.render("home-page.ejs", model);
			});
		} else {
			pageRenderer.render("home-page-not-logged-in.ejs");
		}

	});
};