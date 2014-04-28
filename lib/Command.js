module.exports = function () {

	function addTask(callback) {
		callback();
	}

	return {
		addTask: addTask
	};
};