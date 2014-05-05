var TaskCommand = require("../lib/TaskCommand"),
	PageRenderer = require("../lib/util/PageRenderer");

module.exports = function (app) {

	app.get('/NewTask', function (request, response) {

		var pageRenderer = new PageRenderer(request, response);
		
		pageRenderer.render("new-task.ejs");
	});

	app.post('/NewTask', function (request, response) {

		var taskCommand = new TaskCommand(request);

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