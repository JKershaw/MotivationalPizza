var TaskCommand = require("../lib/TaskCommand");

module.exports = function (app) {

	app.get('/TodayTask/:id', function (request, response) {

		var taskCommand = new TaskCommand();

		taskCommand.markAsToday(request.params.id, function (successful) {
			if (successful) {
				request.flash('info', 'task-updated');
			} else {
				request.flash('info', 'error-too-many-today');
			}
			response.redirect("/");
		});
	});
};