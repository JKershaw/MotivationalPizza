/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie'),
	TaskCommand = require("../../lib/TaskCommand"),
	TaskQuery = require("../../lib/TaskQuery");

var existingTask = {
	'task-text': "This task is gonna get splitted!",
	'task-when': "tomorrow"
},
	newTasks = [{
		'task-text': "This is one task"
	}, {
		'task-text': "And this is another task"
	}];

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

	describe("Then I try split the task", function (done) {

		it('The Command returns true', function (done) {
			taskCommand.split(existingTask._id, newTasks, function (success) {
				expect(success).to.equal(true);
				done();
			});
		});

		describe('Then I get the existing task', function (done) {

			it('The task has been removed', function (done) {
				taskQuery.findByText(existingTask['task-text'], function (returnedTask) {
					expect(returnedTask).to.equal(false);
					done();
				});
			});

			describe('Then I get the new tasks', function (done) {

				it('The first task has been added', function (done) {
					taskQuery.findByText(newTasks[0]['task-text'], function (returnedTask) {
						expect(returnedTask).to.not.equal(false);
						done();
					});
				});

				it('The second task has been added', function (done) {
					taskQuery.findByText(newTasks[1]['task-text'], function (returnedTask) {
						expect(returnedTask).to.not.equal(false);
						done();
					});
				});

				it("both returned tasks have the same stats as the original task", function (done) {
					taskQuery.findByText(newTasks[0]['task-text'], function (returnedTask1) {
						taskQuery.findByText(newTasks[1]['task-text'], function (returnedTask2) {
							expect(returnedTask1.status).to.equal("tomorrow");
							expect(returnedTask2.status).to.equal("tomorrow");
							done();
						});
					});
				});
			});
		});
	});
});