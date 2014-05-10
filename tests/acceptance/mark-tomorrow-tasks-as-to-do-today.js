/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie'),
	user = new require("./util/User")(),
	tasks = new require("./util/Tasks")();

var browser = new Browser({
	site: "http://localhost:3000"
});

var existingTomorrowTasks = [{
	text: "marking a task as for today"
}];

describe('Given a task for tomorrow exists', function (done) {

	before(function (done) {
		user.signup(browser, function () {
			tasks.add(existingTomorrowTasks, browser, function () {
				browser.clickLink('.task .tomorrow-task', done);
			});
		});
	});

	describe("And I visit the home page", function (done) {
		before(function (done) {
			browser.visit('/', done);
		});

		describe("And I click the button to make tomorrow's task today's", function (done) {
			before(function (done) {
				browser.clickLink('#make-tomorrow-today', done);
			});

			it("Then I see the task listed as for today", function () {
				expect(browser.text('.task-open')).to.contain(existingTomorrowTasks[0].text);
			});

			it("Then I can no longer see the task listed as not for today", function () {
				expect(browser.text('.task-not-today')).to.not.contain(existingTomorrowTasks[0].text);
			});

			it("And I am told the task has been updated", function () {
				expect(browser.text('#info-box')).to.contain("Today's tasks have been updated");
			});
		});
	});
});