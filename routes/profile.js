var PageRenderer = require("../lib/util/PageRenderer"),
	User = require("../lib/authentication/User");

module.exports = function (app) {

	var user = new User();

	app.get('/profile', function (request, response) {

		var pageRenderer = new PageRenderer(request, response);
		pageRenderer.render("profile.ejs", model);
	});

	app.post('/profile', function (request, response) {

		var phoneNumber = request.body['profile-phonenumber'];

		user.updatePhoneNumber(request.user, phoneNumber, function () {

			request.flash('info', 'profile-updated');
			response.redirect("/");
		});
	});
};