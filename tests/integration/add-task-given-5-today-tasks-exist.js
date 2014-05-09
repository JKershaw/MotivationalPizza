/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie'),
	TaskCommand = require("../../lib/TaskCommand"),
	TaskQuery = require("../../lib/TaskQuery");

var newTask = {
	text: "Womp womp womp"
},
	existingTask = {
		text: "This task is for today"
	};

var fakeRequest = {
	user: {
		_id: "1"
	}
};

var taskCommand = new TaskCommand(fakeRequest),
	taskQuery = new TaskQuery(fakeRequest);

describe('Given five tasks for today exist', function (done) {

	before(function (done) {
		taskCommand.add(existingTask, function () {
			taskCommand.add(existingTask, function () {
				taskCommand.add(existingTask, function () {
					taskCommand.add(existingTask, function () {
						taskCommand.add(existingTask, function () {
							done();
						});
					});
				});
			});
		});
	});

	describe("Then I try to add a new task", function (done) {

		it('The Command returns false', function (done) {
			taskCommand.add(newTask, function (success) {
				expect(success).to.equal(false);
				done();
			});
		});
	});
});