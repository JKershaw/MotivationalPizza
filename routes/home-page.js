var TaskQuery = require("../lib/TaskQuery");

module.exports = function (app) {

	app.get('/', function (request, response) {

		var taskQuery = new TaskQuery();

		taskQuery.allWithStatus("open", function (openTasks) {
			taskQuery.allWithStatus("done", function (doneTasks) {
				taskQuery.allWithStatus("not-today", function (notTodayTasks) {
					taskQuery.doneToday(function (doneTodayTasks) {
						taskQuery.doneBeforeToday(function (doneBeforeTodayTasks) {

							var infoBox = false;

							switch (request.query.info) {

							case "task-added":
								infoBox = {
									class: "alert-info",
									text: "Your new task has been added."
								};
								break;
							case "task-updated":
								infoBox = {
									class: "alert-info",
									text: "Your task has been updated."
								};
								break;
							case "task-deleted":
								infoBox = {
									class: "alert-warning",
									text: "Your task has been deleted."
								};
								break;
							case "task-done":
								infoBox = {
									class: "alert-success",
									text: "Your task has been done."
								};
								break;

							}

							model = {
								infoBox: infoBox,
								openTasks: openTasks,
								doneTodayTasks: doneTodayTasks,
								doneBeforeTodayTasks: doneBeforeTodayTasks,
								notTodayTasks: notTodayTasks
							};

							response.render("home-page.ejs", model);
						});
					});
				});
			});
		});

	});
};