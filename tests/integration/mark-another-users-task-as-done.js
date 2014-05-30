/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie'),
	TaskCommand = require("../../lib/TaskCommand"),
	TaskQuery = require("../../lib/TaskQuery");

var existingTask = {
	'task-text': "Womp womp womp"
};

var fakeRequest = require("./util/generateFakeRequest")(),
	secondFakeRequest = require("./util/generateFakeRequest")(),
	taskCommand = new TaskCommand(fakeRequest),
	taskQuery = new TaskQuery(fakeRequest);

describe('Given a task for today day exists', function (done) {

	before(function (done) {
		taskCommand.add(existingTask, function () {
			taskQuery.findByText(existingTask['task-text'], function (returnedTask) {
				existingTask = returnedTask;
				taskCommand.markAsNotToday(existingTask._id, function () {
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

		describe("Then I try mark the original task as done", function (done) {

			it('The Command returns false', function (done) {
				taskCommand.markAsDone(existingTask._id, function (success) {
					expect(success).to.equal(false);
					done();
				});
			});
			describe('And I log in as the original user', function (done) {

				before(function (done) {
					taskCommand = new TaskCommand(fakeRequest),
					taskQuery = new TaskQuery(fakeRequest);
					done();
				});

				describe("Then I try mark the original task as done", function (done) {

					it('The Command returns true', function (done) {
						taskCommand.markAsDone(existingTask._id, function (success) {
							expect(success).to.equal(true);
							done();
						});
					});

					it('The Query returns the status', function (done) {
						taskQuery.allWithStatus("done", function (tasks) {
							expect(tasks.length).to.equal(1);
							expect(tasks[0].text).to.equal(existingTask.text);
							done();
						});
					});
				});
			});
		});
	});
});