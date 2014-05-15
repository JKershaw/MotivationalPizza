var TodayFullSpecification = require('./specifications/TodayFullSpecification');

module.exports = function (tasksRepository) {

	var todayFullSpecification = new TodayFullSpecification(tasksRepository);

	function add(task, callback) {

		todayFullSpecification.isSatisfiedBy(task.user, function (todayIsFull) {
			if (todayIsFull && task.status == "open") {
				return callback(false);
			}

			tasksRepository.save(task, function () {
				callback(true);
			});

		});

	}

	return {
		add: add
	};
};