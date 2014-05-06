/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie'),
	TaskCommand = require("../../lib/TaskCommand"),
	TaskQuery = require("../../lib/TaskQuery");

var existingNotTodayTask = {
	text: "Womp womp womp"
},
	existingTask = {
		text: "This task is for today"
	};

var fakeRequest = {
	user: {
		_id: "2"
	}
};

var taskCommand = new TaskCommand(fakeRequest),
	taskQuery = new TaskQuery(fakeRequest);

describe('Given a task for another day exists', function (done) {

	before(function (done) {
		taskCommand.add(existingNotTodayTask.text, function () {
			taskQuery.findByText(existingNotTodayTask.text, function (returnedTask) {
				existingNotTodayTask = returnedTask;
				taskCommand.markAsNotToday(existingNotTodayTask._id, function () {
					done();
				});
			});
		});
	});

	describe('Given five tasks for today exist', function (done) {

		before(function (done) {
			taskCommand.add(existingTask.text, function () {
				taskCommand.add(existingTask.text, function () {
					taskCommand.add(existingTask.text, function () {
						taskCommand.add(existingTask.text, function () {
							taskCommand.add(existingTask.text, function () {
								done();
							});
						});
					});
				});
			});
		});

		describe("Then I try mark the original task as for today", function (done) {

			it('The Command returns false', function (done) {
				taskCommand.markAsToday(existingNotTodayTask._id, function (success) {
					expect(success).to.equal(false);
					done();
				});
			});
		});
	});
});