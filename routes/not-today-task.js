var TaskCommand = require("../lib/TaskCommand");

module.exports = function (app) {

	app.get('/NotTodayTask/:id', function (request, response) {

		var taskCommand = new TaskCommand();

		taskCommand.markAsNotToday(request.params.id, function () {
			response.redirect("/?info=task-updated");
		});
	});
};