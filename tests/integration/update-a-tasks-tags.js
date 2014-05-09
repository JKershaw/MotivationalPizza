/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie'),
	TaskCommand = require("../../lib/TaskCommand"),
	TaskQuery = require("../../lib/TaskQuery");

var existingTask = {
	text: "This task is for today"
},
	tagText = "Tag!",
	secondTagText = "Another Tag!";

var fakeRequest = {
	user: {
		_id: "6"
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

	describe('And I tag it', function (done) {

		it('Then tag command returns true', function (done) {
			taskCommand.tag(existingTask._id, tagText, function (success) {
				expect(success).to.equal(true);
				done();
			});
		});

		describe('And I update its tag with a new tag', function (done) {

			before(function (done) {
				taskCommand.updateTag(existingTask._id, secondTagText, function () {
					done();
				});
			});

			it('Then the task now has two tags', function (done) {
				taskQuery.findByText(existingTask.text, function (returnedTask) {
					expect(returnedTask.tags[0].text).to.equal(secondTagText);
					done();
				});
			});
		});
	});
});