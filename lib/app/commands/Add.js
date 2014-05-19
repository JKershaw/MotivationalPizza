var TodayFullSpecification = require('../specifications/TodayFullSpecification'),
	TaskIsForTodaySpecification = require('../specifications/TaskIsForTodaySpecification');

module.exports = function (clock, tasksRepository, usersRepository) {

	var todayFullSpecification = new TodayFullSpecification(tasksRepository, usersRepository),
		taskIsForTodaySpecification = new TaskIsForTodaySpecification();

	function add(task, callback) {

		todayFullSpecification.isSatisfiedBy(task.user, function (todayIsFull) {
			taskIsForTodaySpecification.isSatisfiedBy(task, function (taskForToday) {
				
				if (todayIsFull && taskForToday) {
					return callback(false);
				}

				task.created = clock.getTime();
				task.bumpedAt = clock.getTime();

				tasksRepository.save(task, function () {
					callback(true);
				});

			});
		});

	}

	return {
		add: add
	};
};