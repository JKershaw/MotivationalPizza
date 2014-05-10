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

	describe('And I tag it', function (done) {

		it('Then tag command returns true', function (done) {
			taskCommand.tag(existingTask._id, tagText, function (success) {
				expect(success).to.equal(true);
				done();
			});
		});

		describe('Then I get the task', function (done) {

			it('The task has been tagged', function (done) {
				taskQuery.findByText(existingTask.text, function (returnedTask) {
					expect(returnedTask.tags[0].text).to.equal(tagText);
					done();
				});
			});

			describe('And I tag it again with a new tag', function (done) {

				before(function (done) {
					taskCommand.tag(existingTask._id, secondTagText, function () {
						done();
					});
				});

				it('Then the task now has two tags', function (done) {
					taskQuery.findByText(existingTask.text, function (returnedTask) {
						expect(returnedTask.tags[0].text).to.equal(tagText);
						expect(returnedTask.tags[1].text).to.equal(secondTagText);
						done();
					});
				});

				describe('Then I try to tag it again with the same tag', function (done) {

					it('the tag command returns true', function (done) {
						taskCommand.tag(existingTask._id, tagText, function (success) {
							expect(success).to.equal(true);
							done();
						});
					});

					describe('Then I get the task', function (done) {

						it('Then the task still has two tags', function (done) {
							taskQuery.findByText(existingTask.text, function (returnedTask) {
								expect(returnedTask.tags.length).to.equal(2);
								expect(returnedTask.tags[0].text).to.equal(tagText);
								expect(returnedTask.tags[1].text).to.equal(secondTagText);
								done();
							});
						});
					});
				});
				
				describe('Then I try to tag it again with an empty', function (done) {

					it('the tag command returns true', function (done) {
						taskCommand.tag(existingTask._id, "", function (success) {
							expect(success).to.equal(true);
							done();
						});
					});

					describe('Then I get the task', function (done) {

						it('Then the task still has just two tags', function (done) {
							taskQuery.findByText(existingTask.text, function (returnedTask) {
								expect(returnedTask.tags.length).to.equal(2);
								expect(returnedTask.tags[0].text).to.equal(tagText);
								expect(returnedTask.tags[1].text).to.equal(secondTagText);
								done();
							});
						});
					});
				});
			});
		});
	});
});