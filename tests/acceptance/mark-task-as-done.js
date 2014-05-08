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
	text: "Visit a bakery and buy a cake"
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

		describe("And I click the Done button for the task", function (done) {
			before(function (done) {
				browser.clickLink('.task .done-task', done);
			});

			it("Then I can no longer see the task listed as active", function () {
				expect(browser.text('.task-open')).to.not.contain(existingTasks[0].text);
			});

			it("Then I see the task listed as complete", function () {
				expect(browser.text('.task-done')).to.contain(existingTasks[0].text);
			});

			it("And I am told the task has been done", function () {
				expect(browser.text('#info-box')).to.contain("Your task has been done");
			});
		});
	});
});