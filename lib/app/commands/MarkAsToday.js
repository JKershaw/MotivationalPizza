var TodayFullSpecification = require('./specifications/TodayFullSpecification');

module.exports = function (tasksRepository) {

	var todayFullSpecification = new TodayFullSpecification(tasksRepository);

	function markAsToday(task, callback) {

		todayFullSpecification.isSatisfiedBy(task.user, function (todayIsFull) {
			if (todayIsFull) {
				return callback(false);
			}

			var query = tasksRepository.buildQuery(task._id, task.user),
				updateRequest = {
					status: "open"
				};

			tasksRepository.update(query, updateRequest, function () {
				callback(true);
			});

		});
	}

	return {
		markAsToday: markAsToday
	};
};