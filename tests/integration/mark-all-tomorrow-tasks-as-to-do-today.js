/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie'),
	TaskCommand = require("../../lib/TaskCommand"),
	TaskQuery = require("../../lib/TaskQuery");

var existingTask1 = {
	'task-text': "Bake a cake"
}, existingTask2 = {
		'task-text': "Bake another cake"
	};

var fakeRequest = require("./util/generateFakeRequest")(),
	taskCommand = new TaskCommand(fakeRequest),
	taskQuery = new TaskQuery(fakeRequest);

describe('Given two tomorrow tasks exist', function (done) {

	before(function (done) {
		taskCommand.add(existingTask1, function () {
			taskQuery.findByText(existingTask1['task-text'], function (returnedTask) {
				existingTask1 = returnedTask;
				taskCommand.markAsTomorrow(existingTask1._id, function (success) {
					taskCommand.add(existingTask2, function () {
						taskQuery.findByText(existingTask2['task-text'], function (returnedTask) {
							existingTask2 = returnedTask;
							taskCommand.markAsTomorrow(existingTask2._id, function (success) {
								done();
							});
						});
					});
				});
			});
		});
	});

	describe('Given I mark all tomorow tasks as today', function (done) {

		it('The Command returns true', function (done) {
			taskCommand.markAllTomorrowAsToday(function (success) {
				expect(success).to.equal(true);
				done();
			});
		});

		describe("Then query to find tasks for today", function (done) {

			it('The Query returns the statuses', function (done) {
				taskQuery.allWithStatus("open", function (tasks) {
					expect(tasks.length).to.equal(2);
					expect(tasks[0].text).to.equal(existingTask1.text);
					expect(tasks[1].text).to.equal(existingTask2.text);
					done();
				});
			});
		});
	});
});