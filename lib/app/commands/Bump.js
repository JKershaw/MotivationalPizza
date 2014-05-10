module.exports = function (tasksRepository) {

	function bump(task, callback) {
		console.log(task);

		var query = tasksRepository.buildQuery(task._id, task.user),
			updateRequest = {
				bumpedAt: new Date().getTime()
			};

		tasksRepository.update(query, updateRequest, function () {
			callback(true);
		});

	}

	return {
		bump: bump
	};
};