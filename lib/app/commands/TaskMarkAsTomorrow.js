var TaskMark = require('./TaskMark');

module.exports = function (clock, repositories) {

	function run(taskMarkArgs, callback) {

		var taskMark = new TaskMark(clock, repositories);

		taskMarkArgs.status = "tomorrow";
		taskMark.run(taskMarkArgs, callback);

	}

	return {
		run: run
	};
};