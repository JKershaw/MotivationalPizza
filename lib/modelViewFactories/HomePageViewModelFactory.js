var TaskQuery = require("../TaskQuery"),
	HttpLinkParser = require("../util/HttpLinkParser");

module.exports = function () {

	function build(infoBoxType, callback) {

		var taskQuery = new TaskQuery();

		taskQuery.allWithStatus("open", function (openTasks) {
			taskQuery.allWithStatus("not-today", function (notTodayTasks) {
				taskQuery.doneToday(function (doneTodayTasks) {
					taskQuery.doneBeforeToday(function (doneBeforeTodayTasks) {

						var infoBox = false;

						switch (infoBoxType) {

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
						case "error-too-many-today":
							infoBox = {
								class: "alert-danger",
								text: "Nope, sorry. You already have enough things to do today."
							};
							break;
						}

						openTasks = parseTasks(openTasks);
						doneTodayTasks = parseTasks(doneTodayTasks);
						doneBeforeTodayTasks = parseTasks(doneBeforeTodayTasks);
						notTodayTasks = parseTasks(notTodayTasks);

						model = {
							infoBox: infoBox,
							openTasks: openTasks,
							doneTodayTasks: doneTodayTasks,
							doneBeforeTodayTasks: doneBeforeTodayTasks,
							notTodayTasks: notTodayTasks
						};

						callback(model);
					});
				});
			});
		});
	};

	function parseTasks(tasks) {
		var httpLinkParser = new HttpLinkParser();

		for (var i = 0; i < tasks.length; i++) {
			tasks[i].text = httpLinkParser.parse(tasks[i].text);
		}

		return tasks;
	}

	return {
		build: build
	};
};