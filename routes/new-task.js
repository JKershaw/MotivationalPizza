var TaskCommand = require("../lib/TaskCommand"),
	TaskQuery = require("../lib/TaskQuery"),
	PageRenderer = require("../lib/util/PageRenderer");

module.exports = function (app) {

	app.get('/NewTask', function (request, response) {

		var taskQuery = new TaskQuery(request),
			pageRenderer = new PageRenderer(request, response);

		taskQuery.allTags(function (commonTags) {
			model = {
				commonTags: commonTags
			};
			pageRenderer.render("new-task.ejs", model);
		});
	});

	app.post('/NewTask', function (request, response) {

		var taskCommand = new TaskCommand(request);

		var newTask = {
			text: request.body['task-text'],
			tagsString: request.body['task-tags']
		};

		taskCommand.add(newTask, function (successful) {
			if (!successful) {
				request.flash('info', 'error-too-many-today');
				return response.redirect("/");
			}

			request.flash('info', 'task-added');
			response.redirect("/");
		});
	});
};