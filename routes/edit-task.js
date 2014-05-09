var EditTaskViewModelFactory = require("../lib/modelViewFactories/EditTaskViewModelFactory"),
	TaskCommand = require("../lib/TaskCommand"),
	PageRenderer = require("../lib/util/PageRenderer");

module.exports = function (app) {

	app.get('/EditTask/:id', function (request, response) {

		var editTaskViewModelFactory = new EditTaskViewModelFactory(request),
			pageRenderer = new PageRenderer(request, response);

		editTaskViewModelFactory.build(function (model) {
			pageRenderer.render("edit-task.ejs", model);
		});
	});

	app.post('/EditTask/:id', function (request, response) {

		var taskCommand = new TaskCommand(request);

		taskCommand.updateText(request.params.id, request.body['task-text'], function () {
			taskCommand.updateTag(request.params.id, request.body['task-tags'], function () {
				request.flash('info', 'task-updated');
				response.redirect("/");
			});
		});
	});
};