module.exports = function (app) {

	app.all('/SMS', function (request, response) {
		console.log("WEEEE!", request);
		response.send(200);
	});
};