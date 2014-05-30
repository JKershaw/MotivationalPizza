var TaskCommand = require("../lib/TaskCommand"),
	TaskQuery = require("../lib/TaskQuery"),
	PageRenderer = require("../lib/util/PageRenderer");

module.exports = function (app) {

	app.get('/NewTask', function (request, response) {

		var taskQuery = new TaskQuery(request),
			pageRenderer = new PageRenderer(request, response);

		taskQuery.popularTags(10, function (commonTags) {
			taskQuery.isTodayFull(function (todayIsfull) {

				model = {
					commonTags: commonTags,
					todayIsfull: todayIsfull
				};
				pageRenderer.render("new-task.ejs", model);
			});
		});
	});

	app.post('/NewTask', function (request, response) {

		var taskCommand = new TaskCommand(request);

		taskCommand.add(request.body, function (successful) {
			
			if (!successful) {
				request.flash('info', 'error-too-many-today');
				return response.redirect("/");
			}

			request.flash('info', 'task-added');
			response.redirect("/");
		});
	});
};