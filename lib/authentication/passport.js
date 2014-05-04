var LocalStrategy = require('passport-local').Strategy,
	User = require('./User');

module.exports = function (passport) {

	var user = new User();

	passport.serializeUser(function (user, done) {
		done(null, user._id);
	});

	passport.deserializeUser(function (id, done) {
		user.findById(id, function (err, user) {
			done(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
			usernameField: 'username',
			passwordField: 'password',
			passReqToCallback: true
		},
		function (request, username, password, done) {

			process.nextTick(function () {

				user.findOne(username, function (err, userAccount) {
					if (userAccount) {
						return done(null, false, request.flash('signupMessage', 'That username is already taken.'));
					} else {

						user.save(username, password, function (err) {
							if (err)
								throw err;

							user.findOne(username, function (err, userAccount) {
								request.flash('info', 'signed-up')
								return done(null, userAccount);
							});
						});
					}
				});
			});
		}));

	/*passport.use('local-login', new LocalStrategy({
			usernameField: 'username',
			passwordField: 'password',
			passReqToCallback: true
		},
		function (req, username, password, done) {

			user.findOne(username, function (err, userAccount) {
				if (err)
					return done(err);

				if (!userAccount)
					return done(null, false, req.flash('loginMessage', 'No user found.'));

				if (!user.validPassword(password))
					return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

				return done(null, userAccount);
			});
		}));*/
};