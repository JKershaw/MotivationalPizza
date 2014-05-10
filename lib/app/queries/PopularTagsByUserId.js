var AllTagsByUserId = require('./AllTagsByUserId');

module.exports = function (tasksRepository) {

	function popularTagsByUserId(userId, numberOfResultsWanted, callback) {

		var allTagsByUserId = new AllTagsByUserId(tasksRepository);

		allTagsByUserId.allTagsByUserId(userId, function (tags) {

			tags.sort(tagSort);

			var subSetOfTags = tags.slice(0, numberOfResultsWanted);

			callback(subSetOfTags);
		});

	}

	function tagSort(a, b) {
		return a.popularity < b.popularity;
	}

	return {
		popularTagsByUserId: popularTagsByUserId
	};
};