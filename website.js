var express = require("express"),
	app = express(),
	path = require('path'),
	ASSETS_DIRECTORY = path.join(__dirname, 'public');

app.use(express.static(ASSETS_DIRECTORY));

app.use(express.bodyParser());
app.use(express.logger('dev'));

app.get('/', function(request, response) {
	response.render("home-page.ejs");
});

app.get('/NewTask', function(request, response) {
	response.render("new-task.ejs");
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Listening on " + port);
});