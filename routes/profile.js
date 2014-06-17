var PageRenderer = require("../lib/util/PageRenderer"),
	UserCommand = require("../lib/UserCommand"),
	UsersRepository = require('../lib/repositories/UsersRepository');

module.exports = function (app) {

	var usersRepository = new UsersRepository(),
		userCommand = new UserCommand(usersRepository);

	app.get('/profile', function (request, response) {

		var pageRenderer = new PageRenderer(request, response);
		pageRenderer.render("profile.ejs", model);
	});

	app.post('/profile', function (request, response) {

		var phoneNumber = request.body['profile-phonenumber'],
			usPhoneNumber = request.body['profile-usphonenumber'],
			maxTodayTaskCount = request.body['profile-maxtodaytaskcount'];

		userCommand.updatePhoneNumber(request.user, phoneNumber, function () {
			userCommand.updateUsPhoneNumber(request.user, usPhoneNumber, function () {
				userCommand.updateMaxTodayTaskCount(request.user, maxTodayTaskCount, function () {
					request.flash('info', 'profile-updated');
					response.redirect("/");
				});
			});
		});
	});
};