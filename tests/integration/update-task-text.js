/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie'),
	TaskCommand = require("../../lib/TaskCommand"),
	TaskQuery = require("../../lib/TaskQuery");

var existingTask = {
	text: "Womp womp womp"
},
	editedText = "edited text";

var fakeRequest = {
	user: {
		_id: "20"
	}
}, secondFakeRequest = {
		user: {
			_id: "21"
		}
	};

var taskCommand = new TaskCommand(fakeRequest),
	taskQuery = new TaskQuery(fakeRequest);

describe('Given a task exists', function (done) {

	before(function (done) {
		taskCommand.add(existingTask, function () {
			taskQuery.findByText(existingTask.text, function (returnedTask) {
				existingTask = returnedTask;
				done();
			});
		});
	});

	describe("Then I edit the task", function (done) {

		before(function (done) {
			taskCommand.updateText(existingTask._id, editedText, function (success) {
				done();
			});
		});

		it('The task has been edited', function (done) {
			taskQuery.allWithStatus("open", function (tasks) {
				expect(tasks.length).to.equal(1);
				expect(tasks[0].text).to.equal(editedText);
				done();
			});
		});

		describe('And I log in as a different user', function (done) {

			before(function (done) {
				taskCommand = new TaskCommand(secondFakeRequest),
				taskQuery = new TaskQuery(secondFakeRequest);
				done();
			});

			describe("Then I try to edit the task", function (done) {

				it('The Command returns false', function (done) {
					taskCommand.updateText(existingTask._id, "Oh snap!", function (success) {
						expect(success).to.equal(false);
						done();
					});
				});

				describe('And I log back in as the original user', function (done) {

					before(function (done) {
						taskCommand = new TaskCommand(fakeRequest),
						taskQuery = new TaskQuery(fakeRequest);
						done();
					});

					it('The task has not been edited', function (done) {
						taskQuery.allWithStatus("open", function (tasks) {
							expect(tasks.length).to.equal(1);
							expect(tasks[0].text).to.equal(editedText);
							done();
						});
					});

				});
			});
		});
	});
});