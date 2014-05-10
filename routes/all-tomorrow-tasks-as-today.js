var TaskCommand = require("../lib/TaskCommand");

module.exports = function (app) {

	app.get('/AllTomorrowTasksAsToday', function (request, response) {

		var taskCommand = new TaskCommand(request);

		taskCommand.markAllTomorrowAsToday(function () {
			request.flash('info', 'tasks-updated');
			response.redirect("/");
		});
	});
};