module.exports = function (tasksRepository) {

	function markAsDone(task, callback) {

		var query = tasksRepository.buildQuery(task._id, task.user),
			updateRequest = {
				status: "done",
				completedAt: new Date().getTime()
			};

		tasksRepository.update(query, updateRequest, function () {
			callback(true);
		});
	}

	return {
		markAsDone: markAsDone
	};
};