require('date-utils');

var TaskMark = require('./TaskMark'),
	TaskUpdateDueDate = require('./TaskUpdateDueDate'),
	TodayFullSpecification = require('../specifications/TodayFullSpecification');

module.exports = function (clock, repositories) {

	var todayFullSpecification = new TodayFullSpecification(repositories.tasks, repositories.users);

	function run(taskMarkArgs, callback) {

		var task = taskMarkArgs.task;

		todayFullSpecification.isSatisfiedBy(task.user, function (todayIsFull) {
			if (todayIsFull) {
				return callback(false);
			}

			var taskMark = new TaskMark(clock, repositories),
				taskUpdateDueDate = new TaskUpdateDueDate(clock, repositories);

			taskMarkArgs.status = "open";
			taskMark.run(taskMarkArgs, function () {

				var taskUpdateDueDateArgs = taskMarkArgs;
				taskUpdateDueDateArgs.dueDate = Date.today();
				taskUpdateDueDate.run(taskUpdateDueDateArgs, callback);
			});

		});
	}

	return {
		run: run
	};
};