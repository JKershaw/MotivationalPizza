var assert = require('assert'),
	MpApp = require('../../lib/app/MpApp');

test("Try to add a task for today when enough already exist", function (done) {

	var newTask = {
		user: "1",
		status: "open"
	};

	var mpApp = new MpApp(new FakeRepository());

	mpApp.command.add(newTask, function (success) {

		assert.equal(success, false);
		done();

	});
});

test("Try to add a task with another status when enough already exist", function (done) {

	var newTask = {
		user: "1",
		status: "tomorrow"
	};

	var mpApp = new MpApp(new FakeRepository());

	mpApp.command.add(newTask, function (success) {

		assert.equal(success, true);
		done();

	});
});


var FakeRepository = function () {

	function save(object, callback) {
		callback(true);
	}

	function find(query, callback) {
		var results = [{}, {}, {}, {}, {}];
		callback(results);
	}

	return {
		find: find,
		save: save
	};
};