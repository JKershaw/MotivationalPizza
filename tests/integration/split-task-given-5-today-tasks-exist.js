/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie'),
	TaskCommand = require("../../lib/TaskCommand"),
	TaskQuery = require("../../lib/TaskQuery");

var existingTasks = [{
	text: "1 This task is gonna get splitted!"
}, {
	text: "2 This task is gonna get splitted!"
}, {
	text: "3 This task is gonna get splitted!"
}, {
	text: "4 This task is gonna get splitted!"
}, {
	text: "5 This task is gonna get splitted!"
}],
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
		taskCommand.add(existingTasks[0], function () {
			taskCommand.add(existingTasks[1], function () {
				taskCommand.add(existingTasks[2], function () {
					taskCommand.add(existingTasks[3], function () {
						taskCommand.add(existingTasks[4], function () {
							taskQuery.findByText(existingTasks[4].text, function (returnedTask) {
								existingTasks[4] = returnedTask;
								done();
							});
						});
					});
				});
			});
		});
	});

	describe("Then I try split the task", function (done) {

		it('The Command returns false', function (done) {
			taskCommand.split(existingTasks[4]._id, newTasks, function (success) {
				expect(success).to.equal(false);
				done();
			});
		});

		describe('Then I get the new tasks', function (done) {

			it('The original still exists', function (done) {
				taskQuery.findByText(existingTasks[4].text, function (returnedTask) {

					expect(returnedTask).to.not.equal(true);
					done();
				});
			});

			it('Both have not been added', function (done) {
				taskQuery.findByText(newTasks[0].text, function (returnedTask) {
					expect(returnedTask).to.equal(false);
					taskQuery.findByText(newTasks[1].text, function (returnedTask) {
						expect(returnedTask).to.equal(false);
						done();
					});
				});
			});
		});
	});
});