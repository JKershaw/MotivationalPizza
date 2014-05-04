module.exports = function(app, passport) {

	app.get('/login', function(request, response) {
		response.render('login.ejs', { message: request.flash('loginMessage') }); 
	});

	// process the login form
	// app.post('/login', do all our passport stuff here);

	app.get('/signup', function(request, response) {
		response.render('signup.ejs', { message: request.flash('signupMessage') });
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/',
		failureRedirect : '/signup',
		failureFlash : true
	}));

	app.get('/logout', function(request, response) {
		request.logout();
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