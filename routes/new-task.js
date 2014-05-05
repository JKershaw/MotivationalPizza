var TaskCommand = require("../lib/TaskCommand");

module.exports = function (app) {

	app.get('/NewTask', function (request, response) {
		response.render("new-task.ejs");
	});

	app.post('/NewTask', function (request, response) {

		var taskCommand = new TaskCommand();

		taskCommand.add(request.body['task-text'], function (successful) {
			if (successful) {
				request.flash('info', 'task-added');
			} else {
				request.flash('info', 'error-too-many-today');
			}
			response.redirect("/");
		});
	});
};