var assert = require('assert'),
	TaskFactory = require('../../../lib/app/objectFactories/TaskFactory');

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

test("Given a task due tomorrow, a  valid task is returned", function (done) {

	var rawTask = {
		status: 'tomorrow'
	};

	var expectedtask = {
		status: 'tomorrow',

		isDueToday: false,
		isDueTomorrow: true,
		isDueSomeOtherTime: false
	};

	taskFactory = new TaskFactory();

	taskFactory.build(rawTask, function (task) {
		assert.deepEqual(rawTask, expectedtask);
		done();
	});
});

test("Given a task due some other time, a  valid task is returned", function (done) {

	var rawTask = {
		status: 'not-today'
	};

	var expectedtask = {
		status: 'not-today',

		isDueToday: false,
		isDueTomorrow: false,
		isDueSomeOtherTime: true
	};

	taskFactory = new TaskFactory();

	taskFactory.build(rawTask, function (task) {
		assert.deepEqual(rawTask, expectedtask);
		done();
	});
});
