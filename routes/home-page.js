var TaskQuery = require("../lib/TaskQuery");

module.exports = function (app) {

	app.get('/', function (request, response) {

		var taskQuery = new TaskQuery();

		taskQuery.allWithStatus("open", function (openTasks) {
			taskQuery.allWithStatus("done", function (doneTasks) {
				taskQuery.allWithStatus("not-today", function (notTodayTasks) {

					var infoBox = false;

					switch (request.query.info) {

					case "task-added":
						infoBox = "task-added";
						break;
					case "task-updated":
						infoBox = "task-updated";
						break;
					case "task-deleted":
						infoBox = "task-deleted";
						break;
					case "task-done":
						infoBox = "task-done";
						break;

					}

					model = {
						info: infoBox,
						openTasks: openTasks,
						doneTasks: doneTasks,
						notTodayTasks: notTodayTasks
					};

					response.render("home-page.ejs", model);
				});
			});
		});

	});
};