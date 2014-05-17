var PageRenderer = require("../lib/util/PageRenderer"),
	User = require("../lib/authentication/User"),
	UsersRepository = require('../lib/repositories/UsersRepository');

module.exports = function (app) {

	var usersRepository = new UsersRepository(),
		user = new User(usersRepository);

	app.get('/profile', function (request, response) {

		var pageRenderer = new PageRenderer(request, response);
		pageRenderer.render("profile.ejs", model);
	});

	app.post('/profile', function (request, response) {

		var phoneNumber = request.body['profile-phonenumber'],
			maxTodayTaskCount = request.body['profile-maxtodaytaskcount'];

		user.updatePhoneNumber(request.user, phoneNumber, function () {
			user.updateMaxTodayTaskCount(request.user, maxTodayTaskCount, function () {
				request.flash('info', 'profile-updated');
				response.redirect("/");
			});
		});
	});
};