var SplitTaskViewModelFactory = require("../lib/modelViewFactories/SplitTaskViewModelFactory"),
	TaskCommand = require("../lib/TaskCommand"),
	PageRenderer = require("../lib/util/PageRenderer");

module.exports = function (app) {

	app.get('/SplitTask/:id', function (request, response) {

		var splitTaskViewModelFactory = new SplitTaskViewModelFactory(request),
			pageRenderer = new PageRenderer(request, response);

		splitTaskViewModelFactory.build(function (model) {
			pageRenderer.render("split-task.ejs", model);
		});
	});

	app.post('/SplitTask/:id', function (request, response) {

		var taskCommand = new TaskCommand(request);

		var newTasks = [{
			text: request.body['task1-text'],
			tagsString: request.body['task1-tags']
		}, {
			text: request.body['task2-text'],
			tagsString: request.body['task2-tags']
		}];

		taskCommand.split(request.params.id, newTasks, function (successful) {
			if (successful) {
				request.flash('info', 'task-split');
			} else {
				request.flash('info', 'error-too-many-today');
			}
			response.redirect("/");
		});
	});
};