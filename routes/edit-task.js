var TaskQuery = require("../lib/TaskQuery"),
	TaskCommand = require("../lib/TaskCommand"),
	PageRenderer = require("../lib/util/PageRenderer");

module.exports = function (app) {

	app.get('/EditTask/:id', function (request, response) {

		var taskQuery = new TaskQuery(),
			pageRenderer = new PageRenderer(request, response);

		taskQuery.findById(request.params.id, function (task) {

			model = {
				task: task
			};

			pageRenderer.render("edit-task.ejs", model);
		});
	});

	app.post('/EditTask/:id', function (request, response) {

		var taskCommand = new TaskCommand();

		taskCommand.updateText(request.params.id, request.body['task-text'], function () {
			request.flash('info', 'task-updated');
			response.redirect("/");
		});
	});
};