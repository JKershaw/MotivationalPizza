var TaskQuery = require("../lib/TaskQuery"),
	TaskCommand = require("../lib/TaskCommand"),
	PageRenderer = require("../lib/util/PageRenderer");

module.exports = function (app) {

	app.get('/EditTask/:id', function (request, response) {

		var taskQuery = new TaskQuery(request),
			pageRenderer = new PageRenderer(request, response);

		taskQuery.findById(request.params.id, function (task) {

			var tags = "";

			for (var i = 0; i < task.tags.length; i ++) {
				
				if (i > 0) {
					tags = tags + ", ";
				}

				tags = tags + task.tags[i].text;
			}

			model = {
				task: task,
				tags: tags
			};

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