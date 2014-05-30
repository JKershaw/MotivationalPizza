var assert = require('assert');

test("Given a basic raw task, a task is returned", function (done) {

	var rawTask = {
		text: 'Womp womp womp',
		status: 'open',
		user: "827c0a552e5eb175fb59e356",
		tags: [],
		created: 1401441028937,
		bumpedAt: 1401441028937,
		_id: "53884b04267be2a1092ebb94"
	};

	var expectedtask = {
		text: 'Womp womp womp',
		status: 'open',
		user: "827c0a552e5eb175fb59e356",
		tags: [],
		created: 1401441028937,
		bumpedAt: 1401441028937,
		_id: "53884b04267be2a1092ebb94",

		isDueToday: true,
		isDueTomorrow: false,
		isDueSomeOtherTime: false
	};

	taskFactory = new TaskFactory();

	taskFactory.build(rawTask, function (task) {
		assert.deepEqual(rawTask, expectedtask);
		done();
	});
});

var TaskFactory = function () {

	function build(input, callback) {

		task = input;

		if (task.status == "open") {
			task.isDueToday = true;
			task.isDueTomorrow = false;
			task.isDueSomeOtherTime = false;
		}

		callback(task);
	}

	return {
		build: build
	};
};