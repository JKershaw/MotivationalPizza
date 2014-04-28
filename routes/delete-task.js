var TaskCommand = require("../lib/TaskCommand");

module.exports = function (app) {

	app.get('/DeleteTask/:id', function (request, response) {

		var taskCommand = new TaskCommand();

		taskCommand.remove(request.params.id, function () {
			response.redirect("/?info=task-deleted");
		});
	});
};