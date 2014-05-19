module.exports = function (clock, repositories) {

	function run(args, callback) {

		var task = args.task;

		var query = repositories.tasks.buildQuery(task._id, task.user),
			updateRequest = {
				status: "done",
				completedAt: clock.getTime()
			};

		repositories.tasks.update(query, updateRequest, function () {
			callback(true);
		});
	}

	return {
		run: run
	};
};