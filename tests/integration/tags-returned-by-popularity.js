/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie'),
	TaskCommand = require("../../lib/TaskCommand"),
	TaskQuery = require("../../lib/TaskQuery");

var task1 = {
	text: "This task is for today",
	tagsString: "one, two, cats, kittens"
}, task2 = {
		text: "This is another task is for today",
		tagsString: "cats, kittens, dogs, cheese"
	}, task3 = {
		text: "This is yet another task is for today",
		tagsString: "cats, dogs, trees, birds"
	}, task4 = {
		text: "This is yet another task is for today",
		tagsString: "cats, kittens, rain, house"
	};

var fakeRequest = require("./util/generateFakeRequest")(),
	taskCommand = new TaskCommand(fakeRequest),
	taskQuery = new TaskQuery(fakeRequest);

describe('Given some tasks exist', function (done) {

	before(function (done) {
		taskCommand.add(task1, function () {
			taskCommand.add(task2, function () {
				taskCommand.add(task3, function () {
					taskCommand.add(task4, function () {
						done();
					});
				});
			});
		});
	});

	describe('And I request the most popular tags', function (done) {

		it('Then the most popular tags are returned', function (done) {
			taskQuery.popularTags(3, function (tags) {
				expect(tags.length).to.equal(3);
				expect(tags[0].text).to.equal("cats");
				expect(tags[1].text).to.equal("kittens");
				expect(tags[2].text).to.equal("dogs");
				done();
			});
		});

	});
});