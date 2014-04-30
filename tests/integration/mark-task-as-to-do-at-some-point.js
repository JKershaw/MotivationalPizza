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
	text: "Tidy the home office"
};

describe('Given a task exists', function (done) {

	var task_id;

	before(function (done) {
		taskCommand.add(task.text, function () {
			taskQuery.findByText(task.text, function (task) {
				task_id = task._id;
				done();
			});
		});
	});

	describe("And I visit the home page", function (done) {
		before(function (done) {
			browser.visit('/', done);
		});

		describe("And I click the Not Today button for the task", function (done) {
			before(function (done) {
				browser.clickLink('.task[data-task-id="' + task_id + '"] .not-today-task', done);
			});

			it("Then I can no longer see the task listed as active", function () {
				expect(browser.text('.task-open')).to.not.contain(task.text);
			});

			it("Then I see the task listed as for not today", function () {
				expect(browser.text('.task-not-today')).to.contain(task.text);
			});

			it("And I am told the task has been updated", function () {
				expect(browser.text('#info-box')).to.contain("Your task has been updated");
			});
		});
	});
});