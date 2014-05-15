/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie'),
	TaskCommand = require("../../lib/TaskCommand"),
	TaskQuery = require("../../lib/TaskQuery");

var existingTask = {
	text: "This task is gonna get splitted!"
},
	newTasks = [{
		text: "This is one task"
	}, {
		text: "And this is another task"
	}];

var fakeRequest = require("./util/generateFakeRequest")(),
	taskCommand = new TaskCommand(fakeRequest),
	taskQuery = new TaskQuery(fakeRequest);

describe('Given a task exists', function (done) {

	before(function (done) {
		taskCommand.add(existingTask, function () {
			taskCommand.add(existingTask, function () {
				taskCommand.add(existingTask, function () {
					taskCommand.add(existingTask, function () {
						taskQuery.findByText(existingTask.text, function (returnedTask) {
							existingTask = returnedTask;
							done();
						});
					});
				});
			});
		});
	});

	describe("Then I try split the task", function (done) {

		it('The Command returns true', function (done) {
			taskCommand.split(existingTask._id, newTasks, function (success) {
				expect(success).to.equal(true);
				done();
			});
		});

		describe('Then I get the new tasks', function (done) {

			it('Both have been added', function (done) {
				taskQuery.findByText(newTasks[0].text, function (returnedTask) {
					expect(returnedTask).to.not.equal(false);
					taskQuery.findByText(newTasks[1].text, function (returnedTask) {
						expect(returnedTask).to.not.equal(false);
						done();
					});
				});
			});
		});
	});
});