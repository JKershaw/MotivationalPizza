/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie'),
	TaskCommand = require("../../lib/TaskCommand"),
	TaskQuery = require("../../lib/TaskQuery");

var existingTask = {
	text: "This task is for today"
},
	tagText = "Tag!, Another Tag!",
	otherTagText = "Another Tag!, I love cats";

var fakeRequest = require("./util/generateFakeRequest")(),
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

	describe('And I tag it with a tag that has a comma', function (done) {

		it('Then tag command returns true', function (done) {
			taskCommand.tag(existingTask._id, tagText, function (success) {
				expect(success).to.equal(true);
				done();
			});
		});

		describe('Then I get the task', function (done) {

			it('Then the task now has two tags', function (done) {
				taskQuery.findByText(existingTask.text, function (returnedTask) {
					expect(returnedTask.tags[0].text).to.equal("Tag!");
					expect(returnedTask.tags[1].text).to.equal("Another Tag!");
					done();
				});
			});

			describe('And I tag it with a tag that has a comma with one valid and one invalid tag', function (done) {

				it('Then tag command returns true', function (done) {
					taskCommand.tag(existingTask._id, otherTagText, function (success) {
						expect(success).to.equal(true);
						done();
					});
				});

				describe('Then I get the task', function (done) {

					it('Then the task now has two tags', function (done) {
						taskQuery.findByText(existingTask.text, function (returnedTask) {
							expect(returnedTask.tags.length).to.equal(3);
							expect(returnedTask.tags[0].text).to.equal("Tag!");
							expect(returnedTask.tags[1].text).to.equal("Another Tag!");
							expect(returnedTask.tags[2].text).to.equal("I love cats");
							done();
						});
					});
				});
			});
		});
	});
});