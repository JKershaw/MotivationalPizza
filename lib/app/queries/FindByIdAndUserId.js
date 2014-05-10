module.exports = function (tasksRepository) {
	
	function findByIdAndUserId(taskId, userId, callback) {
		var query = {
			"_id": tasksRepository.buildId(taskId),
			user: userId
		};

		tasksRepository.find(query, function(tasks){
			callback(tasks[0]);
		});
	}

	return {
		findByIdAndUserId: findByIdAndUserId
	};
};