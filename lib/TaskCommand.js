var mongojs = require('mongojs'),
	db = mongojs.connect(process.env.MONGO_CONNECTION_STRING, ["tasks"]);

module.exports = function () {

	function add(text, callback) {

		var taskObect = taskObjectBuilder(text);

		db.tasks.save(taskObect, function (err, saved) {
			callback();
		});
	}

	function remove(id, callback) {
		var ObjectId = mongojs.ObjectId,
			remove_query = {
				"_id": ObjectId(String(id))
			};

		db.tasks.remove(remove_query, function () {
			callback();
		});
	}

	function markAsDone(id, callback) {

		var ObjectId = mongojs.ObjectId,
			query = {
				_id: ObjectId(String(id))
			},
			update = {
				$set: {
					status: "done"
				}
			},
			multi = {
				multi: false
			};

		db.tasks.update(query, update, multi, function () {
			callback();
		});

	}

	function markAsNotToday(id, callback) {

		var ObjectId = mongojs.ObjectId,
			query = {
				_id: ObjectId(String(id))
			},
			update = {
				$set: {
					status: "not-today"
				}
			},
			multi = {
				multi: false
			};

		db.tasks.update(query, update, multi, function () {
			callback();
		});

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