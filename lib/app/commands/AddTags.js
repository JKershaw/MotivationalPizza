async = require('async'),
TagCanBeAddedSpecification = require('./specifications/TagCanBeAddedSpecification')

module.exports = function (tasksRepository) {

	var tagCanBeAddedSpecification = new TagCanBeAddedSpecification();

	function addTags(task, tags, callback) {

		var numberOfTags = task.tags.length;

		for (var i = 0; i < tags.length; i++) {
			if (tagCanBeAddedSpecification.isSatisfiedBy(task, tags[i].text)) {
				task.tags.push(tags[i]);
			}
		}

		if (numberOfTags == task.tags.length) {
			return callback(false);
		}

		var query = tasksRepository.buildQuery(task._id, task.user),
			updateRequest = {
				tags: task.tags
			};

		tasksRepository.update(query, updateRequest, function () {
			callback(true);
		});

	}

	return {
		addTags: addTags
	};
};