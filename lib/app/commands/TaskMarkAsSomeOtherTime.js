require('date-utils');

var TaskMark = require('./TaskMark'),
	TaskUpdateDueDate = require('./TaskUpdateDueDate');

module.exports = function (clock, repositories) {

	function run(args, callback) {

		var taskMark = new TaskMark(clock, repositories),
			taskUpdateDueDate = new TaskUpdateDueDate(clock, repositories);

		args.status = "not-today";
		taskMark.run(args, callback);
	}

	return {
		run: run
	};
};