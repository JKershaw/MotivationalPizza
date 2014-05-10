var AllByUserId = require("./queries/AllByUserId"),
	AllWithStatusByUserId = require("./queries/AllWithStatusByUserId"),
	DoneTodayByUserId = require("./queries/DoneTodayByUserId"),
	DoneBeforeTodayByUserId = require("./queries/DoneBeforeTodayByUserId"),
	FindByIdAndUserId = require("./queries/FindByIdAndUserId"),
	FindByTextAndUserId = require("./queries/FindByTextAndUserId");

module.exports = function (tasksRepository) {

	function allByUserId(userId, callback) {
		new AllByUserId(tasksRepository).allByUserId(userId, callback);
	}

	function allWithStatusByUserId(status, userId, callback) {
		new AllWithStatusByUserId(tasksRepository).allWithStatusByUserId(status, userId, callback);
	}

	function doneTodayByUserId(userId, callback) {
		new DoneTodayByUserId(tasksRepository).doneTodayByUserId(userId, callback);
	}

	function doneBeforeTodayByUserId(userId, callback) {
		new DoneTodayByUserId(tasksRepository).doneTodayByUserId(userId, callback);
	}

	function findByIdAndUserId(taskId, userId, callback) {
		new FindByIdAndUserId(tasksRepository).findByIdAndUserId(taskId, userId, callback);
	}

	function findByTextAndUserId(text, userId, callback) {
		new FindByTextAndUserId(tasksRepository).findByTextAndUserId(text, userId, callback);
	}

	return {
		allByUserId: allByUserId,
		allWithStatusByUserId: allWithStatusByUserId,
		doneTodayByUserId: doneTodayByUserId,
		doneBeforeTodayByUserId: doneBeforeTodayByUserId,
		findByIdAndUserId: findByIdAndUserId,
		findByTextAndUserId: findByTextAndUserId
	};
};