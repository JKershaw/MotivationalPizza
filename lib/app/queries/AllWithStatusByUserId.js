module.exports = function (tasksRepository) {

	function allWithStatusByUserId(status, userId, callback) {
		tasksRepository.find({
			user: userId,
			status: status
		}, callback);
	}

	return {
		allWithStatusByUserId: allWithStatusByUserId
	};
};