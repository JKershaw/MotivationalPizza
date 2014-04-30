var TasksRepository = require('./TasksRepository');

module.exports = function () {

	var tasksRepository = new TasksRepository();

	function add(text, callback) {

		var taskObect = taskObjectBuilder(text);

		tasksRepository.save(taskObect, callback);
	}

	function remove(id, callback) {
		var remove_query = {
			_id: tasksRepository.buildId(id)
		};

		tasksRepository.remove(remove_query, callback);
	}

	function markAsDone(id, callback) {
		updateStatus(id, "done", callback);

	}

	function markAsNotToday(id, callback) {
		updateStatus(id, "not-today", callback);

	}

	function markAsToday(id, callback) {
		updateStatus(id, "open", callback);
	}

	function updateText(id, text, callback) {

		var query = {
			_id: tasksRepository.buildId(id)
		},
			updateRequest = {
				text: text
			};

		tasksRepository.update(query, updateRequest, callback);
	}

	function updateStatus(id, status, callback) {

		var query = {
			_id: tasksRepository.buildId(id)
		},
			updateRequest = {
				status: status
			};

		tasksRepository.update(query, updateRequest, callback);
	}

	function taskObjectBuilder(text) {

		var taskObect = {
			text: text,
			status: "open"
		};

		return taskObect;
	}

	return {
		add: add,
		remove: remove,
		markAsDone: markAsDone,
		markAsNotToday: markAsNotToday,
		markAsToday: markAsToday,
		updateText: updateText
	};
};