var HomePageViewModelFactory = require("../lib/modelViewFactories/HomePageViewModelFactory"),
	PageRenderer = require("../lib/util/PageRenderer");

module.exports = function (app) {

	app.get('/', function (request, response) {

		var homePageViewModelFactory = new HomePageViewModelFactory(),
			pageRenderer = new PageRenderer(request, response);

		var info = request.flash('info')[0];

		homePageViewModelFactory.build(info, function (model) {
			pageRenderer.render("home-page.ejs", model);
		});
	});
};