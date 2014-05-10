module.exports = function (tasksRepository) {

	function allTagsByUserId(userId, callback) {

		tasksRepository.find({
			user: userId
		}, function (tasks) {

			var allTags = [];

			tasks.forEach(function (task) {
				if (task.tags) {
					allTags = allTags.concat(task.tags);
				}
			});

			var tags = filterTags(allTags);

			callback(tags);
		});
	}

	function filterTags(allTags) {
		var tags = [];

		allTags.forEach(function (newTag) {

			var foundTag = false;

			for (var i = 0; i < tags.length; i++) {
				if (tags[i] && tags[i].text == newTag.text) {
					foundTag = true;
				}
			}

			if (!foundTag) {
				tags.push(newTag);
			}

		});

		return tags;
	}

	return {
		allTagsByUserId: allTagsByUserId
	};
};