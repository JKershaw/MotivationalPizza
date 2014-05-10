module.exports = function (tasksRepository) {

	function updateText(task, text, callback) {

		var query = tasksRepository.buildQuery(task._id, task.user),
			updateRequest = {
				text: text
			};

		tasksRepository.update(query, updateRequest, callback);
	}

	return {
		updateText: updateText
	};
};