var TaskCommand = require("../lib/TaskCommand");

module.exports = function (app) {

	app.get('/DeleteTask/:id', function (request, response) {

		var taskCommand = new TaskCommand(request);

		taskCommand.remove(request.params.id, function () {
			request.flash('info', 'task-deleted');
			response.redirect("/");
		});
	});
};