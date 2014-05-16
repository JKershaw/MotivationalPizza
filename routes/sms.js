module.exports = function (app) {

	app.get('/SMS', function (request, response) {
		console.log("WEEEE!", request);
		response.send(200);
	});
};