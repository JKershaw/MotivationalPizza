var StringSplitter = require('../util/StringSplitter'),
	DateParser = require('../util/DateParser');

module.exports = function () {

	function build(taskDetails, userId, callback) {

		var text = taskDetails.text,
			tags = [],
			status = "open",
			dueDate = null;

		if (taskDetails.tagsString && taskDetails.tagsString.length > 0) {
			tags = StringSplitter(taskDetails.tagsString);
		}

		if (taskDetails.status) {
			status = taskDetails.status;
		}

		if (taskDetails.dueDate) {
			dueDate = DateParser(taskDetails.dueDate);
		}


		var taskObect = {
			text: text,
			status: status,
			user: userId,
			tags: tags,
			dueDate: dueDate
		};

		callback(taskObect);
	}

	return {
		build: build
	};
};