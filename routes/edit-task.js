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

		var updatedTask = {
			text: request.body['task-text'],
			tagsString: request.body['task-tags']
		};

		if (request.body['task-when'] == "tomorrow") {
			updatedTask.status = "tomorrow";
		}

		if (request.body['task-when'] == "some-other-time") {
			updatedTask.status = "not-today";
		}

		taskCommand.update(request.params.id, updatedTask, function () {
			request.flash('info', 'task-updated');
			response.redirect("/");
		});

	});
};