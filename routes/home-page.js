var HomePageViewModelFactory = require("../lib/modelViewFactories/HomePageViewModelFactory");

module.exports = function (app) {

	app.get('/', function (request, response) {

		var homePageViewModelFactory = new HomePageViewModelFactory();

		var info = request.flash('info')[0];

		console.log(request.user);

		homePageViewModelFactory.build(info, request.user, function (model) {
			response.render("home-page.ejs", model);
		});
	});
};