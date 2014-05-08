var TaskCommand = require("../lib/TaskCommand");

module.exports = function (app) {

	app.get('/TomorrowTask/:id', function (request, response) {

		var taskCommand = new TaskCommand(request);

		taskCommand.markAsTomorrow(request.params.id, function () {
			taskCommand.bump(request.params.id, function () {
				request.flash('info', 'task-updated');
				response.redirect("/");
			});
		});
	});
};