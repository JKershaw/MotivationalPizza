var TasksRepository = require('./repositories/TasksRepository'),
	UsersRepository = require('./repositories/UsersRepository'),
	MpApp = require('./app/MpApp');

module.exports = function (request) {

	var tasksRepository = new TasksRepository(),
		usersRepository = new UsersRepository(),
		mpApp = new MpApp(tasksRepository, usersRepository);

	var userId = "";

	if (request.user) {
		userId = request.user._id;
	}

	function all(callback) {
		mpApp.query.allByUserId(userId, callback);
	}

	function allWithStatus(status, callback) {
		mpApp.query.allWithStatusByUserId(status, userId, callback);
	}

	function doneToday(callback) {
		mpApp.query.doneTodayByUserId(userId, callback);
	}

	function doneBeforeToday(callback) {
		mpApp.query.doneBeforeTodayByUserId(userId, callback);
	}

	function findById(id, callback) {
		mpApp.query.findByIdAndUserId(id, userId, function (task) {
			if (!task) {
				task = false;
			}
			callback(task);
		});
	}

	function findByText(text, callback) {
		mpApp.query.findByTextAndUserId(text, userId, function (task) {
			if (!task) {
				task = false;
			}
			callback(task);
		});
	}

	function allTags(callback) {
		mpApp.query.allTagsByUserId(userId, callback);
	}

	function popularTags(number, callback) {
		mpApp.query.popularTagsByUserId(userId, number, callback);
	}

	return {
		all: all,
		allWithStatus: allWithStatus,
		findByText: findByText,
		findById: findById,
		doneToday: doneToday,
		doneBeforeToday: doneBeforeToday,
		allTags: allTags,
		popularTags: popularTags
	};

};