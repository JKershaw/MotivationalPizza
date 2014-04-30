var express = require("express"),
	app = express(),
	path = require('path'),
	ASSETS_DIRECTORY = path.join(__dirname, 'public');

app.use(express.static(ASSETS_DIRECTORY));

app.use(express.bodyParser());
app.use(express.logger('dev'));

require("./routes/home-page")(app);
require("./routes/new-task")(app);
require("./routes/delete-task")(app);
require("./routes/done-task")(app);
require("./routes/not-today-task")(app);
require("./routes/today-task")(app);
require("./routes/edit-task")(app);

var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log("Listening on " + port);
});