/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie'),
	TaskCommand = require("../../lib/TaskCommand"),
	TaskQuery = require("../../lib/TaskQuery");

var newTask = {
	text: "Womp womp womp"
},
	existingTask = {
		text: "This task is for today"
	};

	var userDetails = {
		maxTodayTaskCount: "6"
	};

var fakeRequest = require("./util/generateFakeRequest")(userDetails),
	taskCommand = new TaskCommand(fakeRequest),
	taskQuery = new TaskQuery(fakeRequest);

describe('Given five tasks for today exist for a user able to have six', function (done) {

	before(function (done) {
		taskCommand.add(existingTask, function () {
			taskCommand.add(existingTask, function () {
				taskCommand.add(existingTask, function () {
					taskCommand.add(existingTask, function () {
						taskCommand.add(existingTask, function () {
							done();
						});
					});
				});
			});
		});
	});

	describe("Then I try to add a new task", function (done) {

		it('The Command returns true', function (done) {
			taskCommand.add(newTask, function (success) {
				expect(success).to.equal(true);
				done();
			});
		});
		describe("Then I try to add another new task", function (done) {

		it('The Command returns false', function (done) {
			taskCommand.add(newTask, function (success) {
				expect(success).to.equal(false);
				done();
			});
		});
	});
	});
});