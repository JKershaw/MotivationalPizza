var TaskCommand = require("../lib/TaskCommand");

module.exports = function (app) {

	app.get('/BumpTask/:id', function (request, response) {

		var taskCommand = new TaskCommand(request);

		taskCommand.bump(request.params.id, function () {
			request.flash('info', 'task-updated');
			response.redirect("/");
		});
	});
};