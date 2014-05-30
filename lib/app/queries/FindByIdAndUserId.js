module.exports = function (tasksRepository) {

	function findByIdAndUserId(taskId, userId, callback) {
		var query = {
			"_id": tasksRepository.buildId(taskId),
			user: userId
		};

		tasksRepository.findOne(query, function (task) {
			callback(task);
		});
	}

	return {
		findByIdAndUserId: findByIdAndUserId
	};
};