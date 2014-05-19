module.exports = function (clock, repositories) {

	function run(args, callback) {

		var task = args.task, 
			text = args.text;

		var query = repositories.tasks.buildQuery(task._id, task.user),
			updateRequest = {
				text: text
			};

		repositories.tasks.update(query, updateRequest, callback);
	}

	return {
		run: run
	};
};