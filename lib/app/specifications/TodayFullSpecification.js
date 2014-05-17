module.exports = function (tasksRepository, usersRepository) {

	function isSatisfiedBy(userId, callback) {

		var query = {
			status: "open",
			user: userId
		};

		tasksRepository.find(query, function (todayTasks) {
			usersRepository.findById(userId, function (user) {
				var maxTodayTaskCount = user && user.maxTodayTaskCount || 5;
				callback(todayTasks.length >= maxTodayTaskCount);
			});
		});
	}

	return {
		isSatisfiedBy: isSatisfiedBy
	};
};