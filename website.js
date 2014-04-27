var express = require("express"),
	app = express();

var pg = require('pg').native;

app.use(express.bodyParser());

app.get('/', function (request, response) {

	var conString = process.env.PG_CONNECTION_STRING;

	var client = new pg.Client(conString);
	client.connect(function (err) {
		if (err) {
			return console.error('could not connect to postgres', err);
		}
		client.query('SELECT NOW() AS "theTime"', function (err, result) {
			if (err) {
				return console.error('error running query', err);
			}
			response.send(result.rows[0].theTime);
			client.end();
		});
	});
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Listening on " + port);
});