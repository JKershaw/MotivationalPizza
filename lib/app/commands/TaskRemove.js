module.exports = function (clock, repositories) {

	function run(args, callback) {

		var task = args.task;

		var remove_query = repositories.tasks.buildQuery(task._id, task.user);

		repositories.tasks.remove(remove_query, callback);

	}

	return {
		run: run
	};
};