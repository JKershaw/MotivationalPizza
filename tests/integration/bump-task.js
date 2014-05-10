/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie'),
	TaskCommand = require("../../lib/TaskCommand"),
	TaskQuery = require("../../lib/TaskQuery");

var existingTask = {
		text: "This task is gonna get bumped!"
	};

var fakeRequest = {
	user: {
		_id: "22"
	}
}, secondFakeRequest = {
		user: {
			_id: "23"
		}
	};

var taskCommand = new TaskCommand(fakeRequest),
	taskQuery = new TaskQuery(fakeRequest);

describe('Given a task for today day exists', function (done) {

	before(function (done) {
		taskCommand.add(existingTask, function () {
			taskQuery.findByText(existingTask.text, function (returnedTask) {
				existingTask = returnedTask;
				done();
			});
		});
	});

	describe("Then I try bump the original task", function (done) {

		it('The Command returns true', function (done) {
			taskCommand.bump(existingTask._id, function (success) {
				expect(success).to.equal(true);
				done();
			});
		});

		describe('And I log in as a different user', function (done) {

			before(function (done) {
				taskCommand = new TaskCommand(secondFakeRequest),
				taskQuery = new TaskQuery(secondFakeRequest);
				done();
			});

			describe("Then I try bump the original task", function (done) {

				it('The Command returns false', function (done) {
					taskCommand.bump(existingTask._id, function (success) {
						expect(success).to.equal(false);
						done();
					});
				});
			});
		});
	});
});