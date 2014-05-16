module.exports = function (app) {

	app.all('/SMS', function (request, response) {
		console.log("Body: ", request.body);
		response.send(200);
	});
};
