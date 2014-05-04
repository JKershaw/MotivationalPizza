var HomePageViewModelFactory = require("../lib/modelViewFactories/HomePageViewModelFactory");

module.exports = function (app) {

	app.get('/', function (request, response) {

		var homePageViewModelFactory = new HomePageViewModelFactory();

		var info = request.flash('info')[0];

		homePageViewModelFactory.build(info, function (model) {
			response.render("home-page.ejs", model);
		});
	});
};