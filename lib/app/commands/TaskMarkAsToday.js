var TaskMark = require('./TaskMark'),
	TodayFullSpecification = require('../specifications/TodayFullSpecification');

module.exports = function (clock, repositories) {

	var todayFullSpecification = new TodayFullSpecification(repositories.tasks, repositories.users);

	function run(taskMarkArgs, callback) {

		var task = taskMarkArgs.task;

		todayFullSpecification.isSatisfiedBy(task.user, function (todayIsFull) {
			if (todayIsFull) {
				return callback(false);
			}

			var taskMark = new TaskMark(clock, repositories);

			taskMarkArgs.status = "open";
			taskMark.run(taskMarkArgs, callback);

		});
	}

	return {
		run: run
	};
};