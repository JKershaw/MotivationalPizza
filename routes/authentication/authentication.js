PageRenderer = require("../../lib/util/PageRenderer");

module.exports = function (app, passport) {

	app.get('/login', function (request, response) {

		var pageRenderer = new PageRenderer(request, response);

		pageRenderer.render('login.ejs', {
			message: request.flash('loginMessage')
		});
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.get('/signup', function (request, response) {

		var pageRenderer = new PageRenderer(request, response);

		pageRenderer.render('signup.ejs', {
			message: request.flash('signupMessage')
		});
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	app.get('/logout', function (request, response) {
		request.logout();
		request.flash('info', 'logged-out');
		response.redirect('/');
	});
};

// route middleware to make sure a user is logged in
function isLoggedIn(request, response, next) {

	// if user is authenticated in the session, carry on 
	if (request.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	response.redirect('/');
}