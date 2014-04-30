var TaskCommand = require("../lib/TaskCommand");

module.exports = function (app) {

	app.get('/BumpTask/:id', function (request, response) {

		var taskCommand = new TaskCommand();

		taskCommand.bump(request.params.id, function () {
			response.redirect("/?info=task-updated");
		});
	});
};