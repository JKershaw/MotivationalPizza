var TaskCommand = require("../lib/TaskCommand"),
	TaskQuery = require("../lib/TaskQuery"),
	PageRenderer = require("../lib/util/PageRenderer");

module.exports = function (app) {

	app.get('/NewTask', function (request, response) {

		var taskCommand = new TaskCommand(request),
			taskQuery = new TaskQuery(request),
			pageRenderer = new PageRenderer(request, response);

		taskQuery.allTags(function (tags) {
			model = {
				tags: tags
			};
			pageRenderer.render("new-task.ejs", model);
		});
	});

	app.post('/NewTask', function (request, response) {

		var taskCommand = new TaskCommand(request),
			taskQuery = new TaskQuery(request);

		taskCommand.add(request.body['task-text'], function (successful) {
			if (!successful) {
				request.flash('info', 'error-too-many-today');
				return response.redirect("/");
			}

			taskQuery.findByText(request.body['task-text'], function (task) {
				taskCommand.tag(task._id, request.body['task-tags'], function () {
					request.flash('info', 'task-added');
					response.redirect("/");
				});
			});
		});
	});
};