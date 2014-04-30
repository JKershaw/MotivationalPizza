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
				"_id": ObjectId(String(id))
			};

		tasksRepository.remove(remove_query, callback);
	}

	function markAsDone(id, callback) {

		var query = {
				_id: ObjectId(String(id))
			},
			updateRequest = {
					status: "done"
				};

		tasksRepository.update(query, updateRequest, callback);

	}

	function markAsNotToday(id, callback) {

		var query = {
				_id: ObjectId(String(id))
			},
			updateRequest = {
					status: "not-today"
			};

		tasksRepository.update(query, updateRequest, callback);

	}

	function markAsToday(id, callback) {

		var ObjectId = mongojs.ObjectId,
			query = {
				_id: ObjectId(String(id))
			},
			update = {
				$set: {
					status: "open"
				}
			},
			multi = {
				multi: false
			};

		db.tasks.update(query, update, multi, function () {
			callback();
		});

	}

	function updateText(id, text, callback) {

		var ObjectId = mongojs.ObjectId,
			query = {
				_id: ObjectId(String(id))
			},
			update = {
				$set: {
					text: text
				}
			},
			multi = {
				multi: false
			};

		db.tasks.update(query, update, multi, function () {
			callback();
		});

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