var express = require("express"),
	app = express(),
	bodyParser = require('body-parser'),
	passport = require('passport'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	flash = require('connect-flash'),
	session = require('express-session')
	MongoStore = require('connect-mongo')(session)
	path = require('path'),
	ASSETS_DIRECTORY = path.join(__dirname, 'public');

require('./lib/authentication/passport')(passport);

app.use(express.static(ASSETS_DIRECTORY));

app.use(bodyParser());
app.use(logger('dev'));

app.use(cookieParser());

app.set('view engine', 'ejs');

app.use(session({
	secret: process.env.SESSION_SECRET,
	store: new MongoStore ({
		url: process.env.MONGO_CONNECTION_STRING
	})
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

require("./routes/home-page")(app);
require("./routes/daily-goal-new")(app);
require("./routes/daily-goal-update")(app);
require("./routes/authentication/authentication")(app, passport);

var port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log("Listening on " + port);
});