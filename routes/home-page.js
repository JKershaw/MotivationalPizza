var HomePageViewModelFactory = require("../lib/modelViewFactories/HomePageViewModelFactory");

module.exports = function (app) {

	app.get('/', function (request, response) {

		var homePageViewModelFactory = new HomePageViewModelFactory();

		homePageViewModelFactory.build(request.query.info, function (model) {
			response.render("home-page.ejs", model);
		});
	});
};