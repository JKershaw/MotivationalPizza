module.exports = function (tasksRepository) {
	
	function allByUserId(userId, callback) {
		tasksRepository.find({
			user: userId
		}, callback);
	}

	return {
		allByUserId: allByUserId
	};
};