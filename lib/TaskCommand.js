var mongojs = require('mongojs'),
	db = mongojs.connect(process.env.MONGO_CONNECTION_STRING, ["tasks"]),
	TasksRepository = require('./TasksRepository');

module.exports = function () {

	var tasksRepository = new TasksRepository(),
		ObjectId = mongojs.ObjectId;

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

		var query = {
			_id: tasksRepository.buildId(id)
		},
			updateRequest = {
				status: "done"
			};

		tasksRepository.update(query, updateRequest, callback);

	}

	function markAsNotToday(id, callback) {

		var query = {
			_id: tasksRepository.buildId(id)
		},
			updateRequest = {
				status: "not-today"
			};

		tasksRepository.update(query, updateRequest, callback);

	}

	function markAsToday(id, callback) {

		var query = {
			_id: tasksRepository.buildId(id)
		},
			updateRequest = {
				status: "open"
			};

		tasksRepository.update(query, updateRequest, callback);

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