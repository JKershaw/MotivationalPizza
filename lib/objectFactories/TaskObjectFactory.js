StringSplitter = require('../util/StringSplitter');

module.exports = function () {

	function build(taskDetails, userId, callback) {

		var text = taskDetails.text,
			tags = [],
			status = "open";

		if (taskDetails.tagsString && taskDetails.tagsString.length > 0) {
			tags = StringSplitter(taskDetails.tagsString);
		}

		if (taskDetails.status) {
			status = taskDetails.status;
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