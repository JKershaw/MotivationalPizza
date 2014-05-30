/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie'),
	TaskCommand = require("../../lib/TaskCommand"),
	TaskQuery = require("../../lib/TaskQuery");

var existingTask = {
	'task-text': "This task is to be deleted"
},
	tagText = "Tag!",
	secondTagText = "Another Tag!";

var fakeRequest = require("./util/generateFakeRequest")(),
	taskCommand = new TaskCommand(fakeRequest),
	taskQuery = new TaskQuery(fakeRequest);

describe('Given a task exists', function (done) {

	before(function (done) {
		taskCommand.add(existingTask, function () {
			taskQuery.findByText(existingTask['task-text'], function (returnedTask) {
				existingTask = returnedTask;
				done();
			});
		});
	});

	describe('And I delete it', function (done) {

		it('Then tag command returns true', function (done) {
			taskCommand.remove(existingTask._id, function (success) {
				expect(success).to.equal(true);
				done();
			});
		});

		describe('Then I get the task', function (done) {

			it('The task has been removed', function (done) {
				taskQuery.findByText(existingTask['task-text'], function (returnedTask) {
					expect(returnedTask).to.equal(false);
					done();
				});
			});
		});
	});
});