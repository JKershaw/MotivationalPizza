module.exports = function (clock, repositories) {

	function run(args, callback) {

		var task = args.task, 
			dueDate = args.dueDate;

		var query = repositories.tasks.buildQuery(task._id, task.user),
			updateRequest = {
				dueDate: dueDate
			};

		repositories.tasks.update(query, updateRequest, function(){
			callback(true);
		});
	}

	return {
		run: run
	};
};