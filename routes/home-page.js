var TaskQuery = require("../lib/TaskQuery");

module.exports = function (app) {

	app.get('/', function (request, response) {

		var taskQuery = new TaskQuery();

		taskQuery.allWithStatus("open", function (openTasks) {
			taskQuery.allWithStatus("done", function (doneTasks) {

				model = {
					info: request.query.info || false,
					openTasks: openTasks,
					doneTasks: doneTasks
				};

				response.render("home-page.ejs", model);
			});
		});

	});
};