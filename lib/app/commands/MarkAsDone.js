module.exports = function (clock, tasksRepository) {

	function markAsDone(task, callback) {

		var query = tasksRepository.buildQuery(task._id, task.user),
			updateRequest = {
				status: "done",
				completedAt: clock.getTime()
			};

		tasksRepository.update(query, updateRequest, function () {
			callback(true);
		});
	}

	return {
		markAsDone: markAsDone
	};
};