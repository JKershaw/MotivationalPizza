/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie'),
	TaskCommand = require("../../lib/TaskCommand"),
	TaskQuery = require("../../lib/TaskQuery");

var existingTask = {
	text: "I'm going to mark this task as to do tomorrow"
};

var fakeRequest = {
	user: {
		_id: "7"
	}
};

var taskCommand = new TaskCommand(fakeRequest),
	taskQuery = new TaskQuery(fakeRequest);

describe('Given a task exists', function (done) {

	before(function (done) {
		taskCommand.add(existingTask.text, function () {
			taskQuery.findByText(existingTask.text, function (returnedTask) {
				existingTask = returnedTask;
				done();
			});
		});
	});

	describe('Given I mark the task as for tomorrow', function (done) {

		it('The Command returns true', function (done) {
			taskCommand.markAsTomorrow(existingTask._id, function (success) {
				expect(success).to.equal(true);
				done();
			});

			describe("Then query to find tasks for tomorrow", function (done) {

				it('The Query returns the status', function (done) {
					taskQuery.allWithStatus("tomorrow", function (tasks) {
						expect(tasks.length).to.equal(1);
						expect(tasks[0].text).to.equal(existingTask.text);
						done();
					});
				});
			});
		});
	});
});