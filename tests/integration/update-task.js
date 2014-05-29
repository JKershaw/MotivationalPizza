/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie'),
	TaskCommand = require("../../lib/TaskCommand"),
	TaskQuery = require("../../lib/TaskQuery");

var existingTask = {
	text: "Womp womp womp"
},
	editedText = "Foo Bar",
	tagText = "Tag!",
	secondTagText = "Another Tag!";

var fakeRequest = require("./util/generateFakeRequest")(),
	secondFakeRequest = require("./util/generateFakeRequest")(),
	taskCommand = new TaskCommand(fakeRequest),
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

	describe("Then I edit the task's text and tags", function (done) {

		before(function (done) {
			existingTask.text = editedText;
			existingTask.tagsString = tagText + ", " + secondTagText;
			taskCommand.update(existingTask._id, existingTask, function (success) {
				done();
			});
		});

		it('The task has been edited', function (done) {
			taskQuery.allWithStatus("open", function (tasks) {
				expect(tasks.length).to.equal(1);
				expect(tasks[0].text).to.equal(editedText);
				expect(tasks[0].tags[0].text).to.equal(tagText);
				expect(tasks[0].tags[1].text).to.equal(secondTagText);
				done();
			});
		});
	});
});