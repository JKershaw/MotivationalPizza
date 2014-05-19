var TodayFullSpecification = require('../specifications/TodayFullSpecification');

module.exports = function (clock, repositories) {

	var todayFullSpecification = new TodayFullSpecification(repositories.tasks, repositories.users);

	function run(args, callback) {

		var task = args.task;

		todayFullSpecification.isSatisfiedBy(task.user, function (todayIsFull) {
			if (todayIsFull) {
				return callback(false);
			}

			var query = repositories.tasks.buildQuery(task._id, task.user),
				updateRequest = {
					status: "open"
				};

			repositories.tasks.update(query, updateRequest, function () {
				callback(true);
			});

		});
	}

	return {
		run: run
	};
};