async = require('async'),
TagCanBeAddedSpecification = require('./specifications/TagCanBeAddedSpecification')

module.exports = function (tasksRepository) {

	var tagCanBeAddedSpecification = new TagCanBeAddedSpecification();

	function addTags(task, tags, callback) {

		var runningSuccess = false;

		async.eachSeries(tags, function (tag, done) {
			tagSingle(task, tag, function (success) {
				runningSuccess = runningSuccess || success;
				done();
			});
		}, function () {
			callback(runningSuccess);
		});

	}

	function tagSingle(task, tag, callback) {

		if (!tagCanBeAddedSpecification.isSatisfiedBy(task, tag.text)) {
			return callback(false);
		}

		task.tags.push({
			text: tag.text
		});

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