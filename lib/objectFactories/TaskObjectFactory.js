require('date-utils');

var StringSplitter = require('../util/StringSplitter'),
	DateParser = require('../util/DateParser');

module.exports = function () {

	// Given a request.body, create a task

	function build(taskDetails, userId, callback) {

		var dueDate = DateParser(taskDetails['task-duedate']);
			status = "open";

		if (taskDetails['task-when'] == "tomorrow") {
			status = "tomorrow";
		}

		if (taskDetails['task-when'] == "some-other-time") {
			status = "not-today";
		}

		var tags = [];

		if (taskDetails['task-tags'] && taskDetails['task-tags'].length > 0) {
			tags = StringSplitter(taskDetails['task-tags']);
		}


		var task = {
			user: userId,
			text: taskDetails['task-text'],
			status: status,
			tags: tags,
			dueDate: dueDate
		};

		callback(task);
	}

	return {
		build: build
	};
};