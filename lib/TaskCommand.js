var TasksRepository = require('./TasksRepository'),
	TaskQuery = require('./TaskQuery');

module.exports = function () {

	var tasksRepository = new TasksRepository(),
		taskQuery = new TaskQuery();

	function add(text, callback) {

		taskObjectFactory(text, function (taskObect) {
			tasksRepository.save(taskObect, callback);
		});

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
				status: "done",
				completedAt: new Date().getTime()
			};

		tasksRepository.update(query, updateRequest, callback);

	}

	function markAsNotToday(id, callback) {
		updateStatus(id, "not-today", callback);

	}

	function markAsToday(id, callback) {
		taskQuery.allWithStatus("open", function (todayTasks) {
			if (todayTasks.length < 5) {
				updateStatus(id, "open", function () {
					callback(true);
				});
			} else {
				callback(false);
			}
		});
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

	function bump(id, callback) {

		var query = {
			_id: tasksRepository.buildId(id)
		},
			updateRequest = {
				bumpedAt: new Date().getTime()
			};

		tasksRepository.update(query, updateRequest, callback);

	}

	function taskObjectFactory(text, callback) {

		var taskObect = {
			text: text,
			status: "open",
			bumpedAt: new Date().getTime()
		};
		callback(taskObect);

	}

	return {
		add: add,
		remove: remove,
		markAsDone: markAsDone,
		markAsNotToday: markAsNotToday,
		markAsToday: markAsToday,
		updateText: updateText,
		bump: bump
	};
};