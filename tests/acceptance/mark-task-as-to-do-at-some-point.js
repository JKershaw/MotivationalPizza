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
	text: "Tidy the home office"
}];

describe('Given a task exists', function (done) {

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

			it("Then I can no longer see the task listed as active", function () {
				expect(browser.text('.task-open')).to.not.contain(existingTasks[0].text);
			});

			it("Then I see the task listed as for not today", function () {
				expect(browser.text('.task-not-today')).to.contain(existingTasks[0].text);
			});

			it("And I am told the task has been updated", function () {
				expect(browser.text('#info-box')).to.contain("Your task has been updated");
			});
		});
	});
});