var TaskMark = require('./TaskMark');

module.exports = function (clock, repositories) {

	function run(args, callback) {

		var taskMark = new TaskMark(clock, repositories);
		
		args.status = "not-today";

		taskMark.run(args, callback);
	}

	return {
		run: run
	};
};