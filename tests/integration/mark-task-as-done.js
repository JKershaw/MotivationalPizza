/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie');

require('chai').should();

var browser = new Browser({
	site: "http://localhost:3000"
});

var taskCommand = new require("../../lib/TaskCommand")();
taskQuery = new require("../../lib/TaskQuery")();

var task = {
	text: "Visit a bakery and buy a cake"
};

describe('Given a task exists', function (done) {

	var task_id;

	before(function (done) {
		taskCommand.add(task.text, function () {
			taskQuery.find(task.text, function (task) {
				task_id = task._id;
				done();
			});
		});
	});

	describe("And I visit the home page", function (done) {
		before(function (done) {
			browser.visit('/', done);
		});

		describe("And I click the Done button for the task", function (done) {
			before(function (done) {
				browser.clickLink('.task[data-task-id="' + task_id + '"] > .done-task', done);
			});

			it("Then I can no longer see the task listed as active", function () {
				expect(browser.text('.task-done')).to.not.contain(task.text);
			});

			it("Then I see the task listed as complete", function () {
				expect(browser.text('.done-task')).to.not.contain(task.text);
			});

			it("And I am told the task has been done", function () {
				expect(browser.text('#info-box')).to.contain("Your task has been done");
			});
		});
	});
});