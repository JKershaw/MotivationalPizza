var TaskMark = require('./TaskMark'),
	TodayFullSpecification = require('../specifications/TodayFullSpecification');

module.exports = function (clock, repositories) {

	var todayFullSpecification = new TodayFullSpecification(repositories.tasks, repositories.users);

	function run(args, callback) {

		var task = args.task;

		todayFullSpecification.isSatisfiedBy(task.user, function (todayIsFull) {
			if (todayIsFull) {
				return callback(false);
			}

			var taskMark = new TaskMark(clock, repositories);
		
			args.status = "open";

			taskMark.run(args, callback);

		});
	}

	return {
		run: run
	};
};