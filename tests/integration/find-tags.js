/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie'),
	TaskCommand = require("../../lib/TaskCommand"),
	TaskQuery = require("../../lib/TaskQuery");

var existingTask = {
	'task-text': "This task is for today"
}, secondTask = {
		'task-text': "A whole new task, bro!"
	},
	tagText = "Tag!",
	secondTagText = "Another Tag!, Tag!, Food";

var fakeRequest = require("./util/generateFakeRequest")(),
	taskCommand = new TaskCommand(fakeRequest),
	taskQuery = new TaskQuery(fakeRequest);

describe('Given a task exists with no tags', function (done) {

	before(function (done) {
		taskCommand.add(existingTask, function () {
			taskQuery.findByText(existingTask['task-text'], function (returnedTask) {
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
				var updateTag = existingTask;
				updateTag['task-tags'] = tagText;
				taskCommand.update(updateTag._id, updateTag, function (success) {
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
					taskCommand.add(secondTask, function () {
						taskQuery.findByText(secondTask['task-text'], function (returnedTask) {
							var updateTag = returnedTask;
							updateTag['task-tags'] = secondTagText;
							taskCommand.update(updateTag._id, updateTag, function (success) {
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