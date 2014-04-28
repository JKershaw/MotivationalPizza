var TaskQuery = require("../lib/TaskQuery");

module.exports = function (app) {

	app.get('/', function (request, response) {

		var taskQuery = new TaskQuery();

		taskQuery.all(function (tasks) {

			model = {
				info: request.query.info || false,
				tasks: tasks
			};

			response.render("home-page.ejs", model);
		});

	});
};