var TaskCommand = require("../lib/TaskCommand");

module.exports = function (app) {

	app.get('/TodayTask/:id', function (request, response) {

		var taskCommand = new TaskCommand();

		taskCommand.markAsToday(request.params.id, function (successful) {
			if (successful) {
				response.redirect("/?info=task-updated");
			} else {
				response.redirect("/?info=error-too-many-today");
			}
		});
	});
};