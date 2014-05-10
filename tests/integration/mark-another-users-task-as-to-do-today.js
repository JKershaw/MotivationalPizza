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

var fakeRequest = require("./util/generateFakeRequest")(),
	secondFakeRequest = require("./util/generateFakeRequest")(),
	taskCommand = new TaskCommand(fakeRequest),
	taskQuery = new TaskQuery(fakeRequest);

describe('Given a task for another day day exists', function (done) {

	before(function (done) {
		taskCommand.add(existingNotTodayTask, function () {
			taskQuery.findByText(existingNotTodayTask.text, function (returnedTask) {
				existingNotTodayTask = returnedTask;
				taskCommand.markAsNotToday(existingNotTodayTask._id, function () {
					done();
				});
			});
		});
	});


	describe('And I log in as a different user', function (done) {

		before(function (done) {
			taskCommand = new TaskCommand(secondFakeRequest),
			taskQuery = new TaskQuery(secondFakeRequest);
			done();
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