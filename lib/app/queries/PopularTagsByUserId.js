module.exports = function (tasksRepository) {

	function popularTagsByUserId(userId, numberOfResultsWanted, callback) {

		var tags = [{text: "Lambs!"}];
		callback(tags);

	}

	return {
		popularTagsByUserId: popularTagsByUserId
	};
};