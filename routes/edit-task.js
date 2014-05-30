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

		taskCommand.update(request.params.id, request.body, function (successful) {
			
			if (!successful) {
				request.flash('info', 'error-too-many-today');
				return response.redirect("/");
			}

			request.flash('info', 'task-updated');
			response.redirect("/");
		});
	});
};