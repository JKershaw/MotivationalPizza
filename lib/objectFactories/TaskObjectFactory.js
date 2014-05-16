StringSplitter = require('../util/StringSplitter');

module.exports = function () {

	function build(newTask, userId, callback) {

		var text = newTask.text,
			tags = [],
			status = "open";

		if (newTask.tagsString && newTask.tagsString.length > 0) {
			tags = StringSplitter(newTask.tagsString);
		}

		if (newTask.status) {
			status = newTask.status;
		}

		var taskObect = {
			text: text,
			status: status,
			bumpedAt: new Date().getTime(),
			user: userId,
			tags: tags
		};

		callback(taskObect);
	}

	return {
		build: build
	};
};