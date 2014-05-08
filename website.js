var express = require("express"),
	app = express(),
	passport = require('passport'),
	flash = require('connect-flash');

var path = require('path'),
	ASSETS_DIRECTORY = path.join(__dirname, 'public');

require('./lib/authentication/passport')(passport);

app.configure(function () {

	app.use(express.static(ASSETS_DIRECTORY));

	app.use(express.bodyParser());
	app.use(express.logger('dev'));

	app.use(express.cookieParser());

	app.set('view engine', 'ejs');

	app.use(express.session({
		secret: process.env.SESSION_SECRET
	}));

	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());

});

require("./routes/home-page")(app);
require("./routes/new-task")(app);
require("./routes/delete-task")(app);
require("./routes/done-task")(app);
require("./routes/not-today-task")(app);
require("./routes/today-task")(app);
require("./routes/edit-task")(app);
require("./routes/bump-task")(app);
require("./routes/tomorrow-task")(app);

require("./routes/authentication/authentication")(app, passport);

var port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log("Listening on " + port);
});