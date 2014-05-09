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

		var taskCommand = new TaskCommand(request),
			taskQuery = new TaskQuery(request);

		var newTask = {
			text: request.body['task-text'],
			tagsString: request.body['task-tags']
		};

		taskCommand.add(newTask, function (successful) {
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