var HomePageModelFactory = require("../lib/modelFactories/HomePageModelFactory");

module.exports = function (app) {

	app.get('/', function (request, response) {

		var homePageModelFactory = new HomePageModelFactory();

		homePageModelFactory.build(request.query.info, function (model) {
			response.render("home-page.ejs", model);
		});
	});
};