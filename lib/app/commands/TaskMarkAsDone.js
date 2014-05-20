var TaskMark = require('./TaskMark');

module.exports = function (clock, repositories) {

	function run(args, callback) {

		var taskMark = new TaskMark(clock, repositories);
		
		args.status = "done";

		taskMark.run(args, callback);
	}

	return {
		run: run
	};
};