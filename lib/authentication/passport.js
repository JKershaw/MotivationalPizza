var LocalStrategy = require('passport-local').Strategy,
	UserCommand = require('../UserCommand'),
	UserQuery = require('../UserQuery'),
	Repository = require('../repositories/Repository');

module.exports = function (passport) {

	var usersRepository = new Repository("users"),
		userQuery = new UserQuery(usersRepository),
		userCommand = new UserCommand(usersRepository);

	passport.serializeUser(function (user, done) {
		done(null, user._id);
	});

	passport.deserializeUser(function (id, done) {
		userQuery.findById(id, function (err, user) {
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

				userQuery.findOne(username, function (err, userAccount) {
					if (userAccount) {
						return done(null, false, request.flash('signupMessage', 'That username is already taken.'));
					} else {

						userCommand.save(username, password, function (err) {
							if (err)
								throw err;

							userQuery.findOne(username, function (err, user) {
								request.flash('info', 'signed-up');
								return done(null, user);
							});
						});
					}
				});
			});
		}));

	passport.use('local-login', new LocalStrategy({
			usernameField: 'username',
			passwordField: 'password',
			passReqToCallback: true
		},
		function (request, username, password, done) {

			userQuery.findOne(username, function (err, userAccount) {
				if (err)
					return done(err);

				if (!userAccount)
					return done(null, false, request.flash('loginMessage', 'No user found.'));

				if (!userQuery.validPassword(password, userAccount.password))
					return done(null, false, request.flash('loginMessage', 'Oops! Wrong password.'));

				request.flash('info', 'logged-in');
				return done(null, userAccount);
			});
		}));
};