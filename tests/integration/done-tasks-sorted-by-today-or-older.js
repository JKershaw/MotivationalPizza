/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie');

require('chai').should();

var browser = new Browser({
	site: "http://localhost:3000"
});

var tasksRepository = new require("../../lib/TasksRepository")();

var oldTask = {
	_id: "OldIdHere",
	text: "This is a very old and completed task",
	status: "done",
	completedAt: 100
};

describe('Given an old task exists', function (done) {

	before(function (done) {
		tasksRepository.save(oldTask, function () {
			done();
		});
	});

	describe("And I visit the home page", function (done) {
		before(function (done) {
			browser.visit('/', done);
		});

		it("Then the old done task is listed in the old section", function () {
			expect(browser.text('.archived-task-done')).to.contain(oldTask.text);
		});

	});
});