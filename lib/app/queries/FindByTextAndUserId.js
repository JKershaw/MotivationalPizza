module.exports = function (tasksRepository) {
	
	function findByTextAndUserId(text, userId, callback) {
		var query = {
			text: text,
			user: userId
		};

		tasksRepository.findOne(query, callback);
	}

	return {
		findByTextAndUserId: findByTextAndUserId
	};
};