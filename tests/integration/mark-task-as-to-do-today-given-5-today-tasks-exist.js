/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie'),
	TaskCommand = require("../../lib/TaskCommand"),
	TaskQuery = require("../../lib/TaskQuery");

var existingNotTodayTask = {
	'task-text': "Womp womp womp"
},
	existingTask = {
		'task-text': "This task is for today"
	};

var fakeRequest = require("./util/generateFakeRequest")(),
	taskCommand = new TaskCommand(fakeRequest),
	taskQuery = new TaskQuery(fakeRequest);

describe('Given a task for another day exists', function (done) {

	before(function (done) {
		taskCommand.add(existingNotTodayTask, function () {
			taskQuery.findByText(existingNotTodayTask['task-text'], function (returnedTask) {
				existingNotTodayTask = returnedTask;
				taskCommand.markAsNotToday(existingNotTodayTask._id, function () {
					done();
				});
			});
		});
	});

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