var TaskQuery = require("../TaskQuery");

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

						for (var i = 0; i < openTasks.length; i++) {
							openTasks[i].text = parse(openTasks[i].text);
						}

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

	function parse(text) {

		var exp = /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

		return text.replace(exp, "<a href=\"$1\" target=\"_blank\" rel=\"nofollow\">$1</a>");
	}

	return {
		build: build
	};
};