/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie'),
	TaskCommand = require("../../lib/TaskCommand"),
	TaskQuery = require("../../lib/TaskQuery");

var existingTask = {
	text: "This task is for today"
}, secondTask = {
		text: "A whole new task, bro!"
	},
	tagText = "Tag!",
	secondTagText = "Another Tag!, Tag!, Food";

var fakeRequest = {
	user: {
		_id: "4"
	}
};

var taskCommand = new TaskCommand(fakeRequest),
	taskQuery = new TaskQuery(fakeRequest);

describe('Given a task exists with no tags', function (done) {

	before(function (done) {
		taskCommand.add(existingTask.text, function () {
			taskQuery.findByText(existingTask.text, function (returnedTask) {
				existingTask = returnedTask;
				done();
			});
		});
	});

	describe('And I query for tags', function (done) {

		it('Then no tags are returned', function (done) {
			taskQuery.allTags(function (tags) {
				expect(tags.length).to.equal(0);
				done();
			});
		});

		describe('given I tag the task', function (done) {

			before(function (done) {
				taskCommand.tag(existingTask._id, tagText, function (success) {
					done();
				});
			});

			it('Then a tag is returned', function (done) {
				taskQuery.allTags(function (tags) {
					expect(tags.length).to.equal(1);
					expect(tags[0].text).to.equal(tagText);
					done();
				});
			});

			describe('Given a new task exists with several tags', function (done) {

				before(function (done) {
					taskCommand.add(secondTask.text, function () {
						taskQuery.findByText(secondTask.text, function (returnedTask) {
							secondTask = returnedTask;
							taskCommand.tag(secondTask._id, secondTagText, function (success) {
								done();
							});
						});
					});
				});

				it('Then the tags are returned without duplication', function (done) {
					taskQuery.allTags(function (tags) {
						expect(tags.length).to.equal(3);
						done();
					});
				});
			});
		});
	});
});