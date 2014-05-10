module.exports = function (tasksRepository) {

	function markAsNotToday(task, callback) {

		var query = tasksRepository.buildQuery(task._id, task.user),
			updateRequest = {
				status: "not-today"
			};

		tasksRepository.update(query, updateRequest, function () {
			callback(true);
		});
	}

	return {
		markAsNotToday: markAsNotToday
	};
};