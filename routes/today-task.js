var TaskCommand = require("../lib/TaskCommand");

module.exports = function (app) {

	app.get('/TodayTask/:id', function (request, response) {

		var taskCommand = new TaskCommand();

		taskCommand.markAsToday(request.params.id, function () {
			response.redirect("/?info=task-updated");
		});
	});
};