require('date-utils');

var TaskMark = require('./TaskMark'),
	TaskUpdateDueDate = require('./TaskUpdateDueDate');

module.exports = function (clock, repositories) {

	function run(taskMarkArgs, callback) {

		var taskMark = new TaskMark(clock, repositories),
			taskUpdateDueDate = new TaskUpdateDueDate(clock, repositories);

		taskMarkArgs.status = "tomorrow";
		taskMark.run(taskMarkArgs, function () {
			var taskUpdateDueDateArgs = taskMarkArgs;
			taskUpdateDueDateArgs.dueDate = Date.tomorrow();
			taskUpdateDueDate.run(taskUpdateDueDateArgs, callback);

		});

	}

	return {
		run: run
	};
};