var TaskCommand = require("../lib/TaskCommand");

module.exports = function (app) {

	app.get('/DoneTask/:id', function (request, response) {

		var taskCommand = new TaskCommand();

		taskCommand.markAsDone(request.params.id, function () {
			response.redirect("/?info=task-done");
		});
	});
};