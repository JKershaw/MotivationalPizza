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

							var notTodayTags = [];

							for (var i = 0; i < notTodayTasks.length; i++) {

								if (notTodayTasks[i].tags) {
									for (var tag_i = 0; tag_i < notTodayTasks[i].tags.length; tag_i++) {
										if (notTodayTags.indexOf(notTodayTasks[i].tags[tag_i].text) == -1) {
											notTodayTags.push(notTodayTasks[i].tags[tag_i].text);

										}
									}
								}
							}

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
								pizzaForDinner: pizzaForDinner,
								notTodayTags: notTodayTags
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