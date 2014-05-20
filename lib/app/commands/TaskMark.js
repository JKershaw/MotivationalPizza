module.exports = function (clock, repositories) {

	function run(args, callback) {

		var task = args.task,
			status = args.status;

		var query = repositories.tasks.buildQuery(task._id, task.user),
			updateRequest = {
				status: status,
				lastStateChangeAt: clock.getTime(),
				bumpedAt: clock.getTime()
			};

		if (status == "done") {
			updateRequest.completedAt = clock.getTime();
		}

		repositories.tasks.update(query, updateRequest, function () {
			callback(true);
		});
	}

	return {
		run: run
	};
};