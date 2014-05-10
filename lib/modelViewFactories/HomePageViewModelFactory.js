var TaskQuery = require("../TaskQuery"),
	TasksDisplayParser = require("../util/TasksDisplayParser"),
	InfoBoxDisplayBuilder = require("../util/InfoBoxDisplayBuilder");

module.exports = function (request) {

	function build(callback) {

		var taskQuery = new TaskQuery(request),
			tasksDisplayParser = new TasksDisplayParser(),
			infoBoxDisplaybuilder = new InfoBoxDisplayBuilder();

		taskQuery.allWithStatus("open", function (openTasks) {
			taskQuery.allWithStatus("tomorrow", function (tomorrowTasks) {
				taskQuery.allWithStatus("not-today", function (notTodayTasks) {
					taskQuery.doneToday(function (doneTodayTasks) {
						taskQuery.doneBeforeToday(function (doneBeforeTodayTasks) {

							var infoBoxType = request.flash('info')[0],
								infoBox = infoBoxDisplaybuilder.build(infoBoxType);

							openTasks = tasksDisplayParser.parse(openTasks);
							tomorrowTasks = tasksDisplayParser.parse(tomorrowTasks);
							notTodayTasks = tasksDisplayParser.parse(notTodayTasks);
							doneTodayTasks = tasksDisplayParser.parse(doneTodayTasks);
							doneBeforeTodayTasks = tasksDisplayParser.parse(doneBeforeTodayTasks);

							var pizzaForDinner = (openTasks.length === 0) && (doneTodayTasks.length > 0);

							model = {
								infoBox: infoBox,
								openTasks: openTasks,
								tomorrowTasks: tomorrowTasks,
								doneTodayTasks: doneTodayTasks,
								doneBeforeTodayTasks: doneBeforeTodayTasks,
								notTodayTasks: notTodayTasks,
								pizzaForDinner: pizzaForDinner
							};

							callback(model);
						});
					});
				});
			});
		});
	}

	return {
		build: build
	};
};