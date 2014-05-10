module.exports = function (tasksRepository) {

	function remove(task, callback) {

		var remove_query = tasksRepository.buildQuery(task._id, task.user);

		tasksRepository.remove(remove_query, function(){
			callback(true);
		});

	}

	return {
		remove: remove
	};
};