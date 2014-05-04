var TaskQuery = require("../lib/TaskQuery"),
	TaskCommand = require("../lib/TaskCommand");

module.exports = function (app) {

	app.get('/EditTask/:id', function (request, response) {

		var taskQuery = new TaskQuery();

		taskQuery.findById(request.params.id, function (task) {

			model = {
				task: task
			};

			response.render("edit-task.ejs", model);
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