/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie'),
	user = new require("./util/User")(),
	tasks = new require("./util/Tasks")();

var browser = new Browser({
	site: "http://localhost:3000"
});

var existingTasks = [{
	text: "marking a task as for today"
}];

describe('Given a task for another day exists', function (done) {

	before(function (done) {
		user.signup(browser, function () {
			tasks.add(existingTasks, browser, function () {
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
				browser.clickLink('.task .not-today-task', done);
			});

			describe("And I click the Today button for the task", function (done) {
				before(function (done) {
					browser.clickLink('.task .today-task', done);
				});

				it("Then I see the task listed as for today", function () {
					expect(browser.text('.task-open')).to.contain(existingTasks[0].text);
				});

				it("Then I can no longer see the task listed as not for today", function () {
					expect(browser.text('.task-not-today')).to.not.contain(existingTasks[0].text);
				});

				it("And I am told the task has been updated", function () {
					expect(browser.text('#info-box')).to.contain("Your task has been updated");
				});
			});
		});
	});
});