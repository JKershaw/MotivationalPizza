module.exports = function (tasksRepository) {

	function filter(allTags) {
		var tags = [];

		allTags.forEach(function (newTag) {

			var foundTag = false;

			for (var i = 0; i < tags.length; i++) {
				if (tags[i].text == newTag.text) {
					tags[i].popularity = tags[i].popularity + 1;
					foundTag = true;
				}
			}

			if (!foundTag) {
				tags.push({
					text: newTag.text,
					popularity: 1
				});
			}

		});

		return tags;
	}

	return {
		filter: filter
	};
};