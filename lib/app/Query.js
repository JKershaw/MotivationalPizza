var AllByUserId = require("./queries/AllByUserId"),
	AllWithStatusByUserId = require("./queries/AllWithStatusByUserId");

module.exports = function (tasksRepository) {

	function allByUserId(userId, callback) {
		new AllByUserId(tasksRepository).allByUserId(userId, callback);
	}

	function allWithStatusByUserId(status, userId, callback) {
		new AllWithStatusByUserId(tasksRepository).allWithStatusByUserId(status, userId, callback);
	}

	return {
		allByUserId: allByUserId,
		allWithStatusByUserId: allWithStatusByUserId
	};
};