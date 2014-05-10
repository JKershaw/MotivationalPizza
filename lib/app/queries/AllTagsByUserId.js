var TagPopularityFilter = require('../util/TagPopularityFilter');

module.exports = function (tasksRepository) {

	function allTagsByUserId(userId, callback) {

		var tagPopularityFilter = new TagPopularityFilter();

		tasksRepository.find({
			user: userId
		}, function (tasks) {

			var allTags = [];

			tasks.forEach(function (task) {
				if (task.tags) {
					allTags = allTags.concat(task.tags);
				}
			});

			var tags = tagPopularityFilter.filter(allTags);

			callback(tags);
		});
	}

	return {
		allTagsByUserId: allTagsByUserId
	};
};