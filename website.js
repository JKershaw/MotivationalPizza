var express = require("express"),
	app = express();

app.use(express.bodyParser());

app.get('/', function(request, response) {
	response.send("Sun");
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Listening on " + port);
});