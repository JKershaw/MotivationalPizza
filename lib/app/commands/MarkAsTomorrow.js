module.exports = function (tasksRepository) {

	function markAsTomorrow(task, callback) {

		var query = tasksRepository.buildQuery(task._id, task.user),
			updateRequest = {
				status: "tomorrow"
			};

		tasksRepository.update(query, updateRequest, function () {
			callback(true);
		});
	}

	return {
		markAsTomorrow: markAsTomorrow
	};
};