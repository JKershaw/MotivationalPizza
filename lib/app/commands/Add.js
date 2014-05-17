var TodayFullSpecification = require('./specifications/TodayFullSpecification'),
	TaskIsForTodaySpecification = require('./specifications/TaskIsForTodaySpecification');

module.exports = function (tasksRepository, usersRepository) {

	var todayFullSpecification = new TodayFullSpecification(tasksRepository, usersRepository),
		taskIsForTodaySpecification = new TaskIsForTodaySpecification();

	function add(task, callback) {

		todayFullSpecification.isSatisfiedBy(task.user, function (todayIsFull) {
			taskIsForTodaySpecification.isSatisfiedBy(task, function (taskForToday) {
				
				if (todayIsFull && taskForToday) {
					return callback(false);
				}

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