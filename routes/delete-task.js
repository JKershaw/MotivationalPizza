var Command = require("../lib/Command");

module.exports = function (app) {

	app.get('/DeleteTask/:id', function (request, response) {

		var command = new Command();

		command.deleteTask(request.params.id, function () {
			response.redirect("/");
		});
	});
};