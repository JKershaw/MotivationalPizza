var TaskQuery = require("../TaskQuery"),
	TasksDisplayParser = require("../util/TasksDisplayParser"),
	InfoBoxDisplayBuilder = require("../util/InfoBoxDisplayBuilder");

module.exports = function (request) {

	function build(infoBoxType, callback) {

		var taskQuery = new TaskQuery(request),
			tasksDisplayParser = new TasksDisplayParser(),
			infoBoxDisplaybuilder = new InfoBoxDisplayBuilder();

		taskQuery.allWithStatus("open", function (openTasks) {
			taskQuery.allWithStatus("not-today", function (notTodayTasks) {
				taskQuery.doneToday(function (doneTodayTasks) {
					taskQuery.doneBeforeToday(function (doneBeforeTodayTasks) {

						var infoBox = infoBoxDisplaybuilder.build(infoBoxType);
						
						openTasks = tasksDisplayParser.parse(openTasks);
						notTodayTasks = tasksDisplayParser.parse(notTodayTasks);
						doneTodayTasks = tasksDisplayParser.parse(doneTodayTasks);
						doneBeforeTodayTasks = tasksDisplayParser.parse(doneBeforeTodayTasks);

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

	return {
		build: build
	};
};