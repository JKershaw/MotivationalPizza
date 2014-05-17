module.exports = function (tasksRepository, usersRepository) {

	function isSatisfiedBy(userId, callback) {

		var query = {
			status: "open",
			user: userId
		};

		tasksRepository.find(query, function (todayTasks) {
			usersRepository.findById(userId, function (user) {
				console.log(user);
				callback(todayTasks.length >= 5);
			});
		});
	}

	return {
		isSatisfiedBy: isSatisfiedBy
	};
};