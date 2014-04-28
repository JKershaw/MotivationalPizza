var Command = require("../lib/Command");

module.exports = function (app) {

	app.get('/NewTask', function (request, response) {
		response.render("new-task.ejs");
	});

	app.post('/NewTask', function (request, response) {

		var command = new Command();

		command.addTask(request.body['task-text'], function () {
			response.redirect("/?info=task-added");
		});
	});
};