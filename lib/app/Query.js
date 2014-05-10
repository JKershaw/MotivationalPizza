var AllByUserId = require("./queries/AllByUserId");

module.exports = function (tasksRepository) {

	function allByUserId(userId, callback) {
		new AllByUserId(tasksRepository).allByUserId(userId, callback);
	}

	return {
		allByUserId: allByUserId
	};
};