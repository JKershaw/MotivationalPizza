var TodayFullSpecification = require('../specifications/TodayFullSpecification'),
	TaskIsForTodaySpecification = require('../specifications/TaskIsForTodaySpecification');

module.exports = function (clock, repositories) {

	var tasksRepository = repositories.tasks, 
		usersRepository = repositories.users;

	var todayFullSpecification = new TodayFullSpecification(tasksRepository, usersRepository),
		taskIsForTodaySpecification = new TaskIsForTodaySpecification();

	function run(args, callback) {

		var task = args.task;

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
		run: run
	};
};