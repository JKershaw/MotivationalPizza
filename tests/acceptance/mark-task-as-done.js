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

describe('Given I sign up', function (done) {

	before(function (done) {
		user.signup(browser, function () {
			done();
		});
	});

	describe("And I visit the home page", function (done) {
		before(function (done) {
			browser.visit('/', done);
		});

		it("Then I am told I have no tasks to do", function () {
			expect(browser.text('#no-current-tasks')).to.contain("Oh sweet, you currently have no tasks to do.");
		});

		describe('Given a task exists', function (done) {

			before(function (done) {
				tasks.add(existingTasks, browser, function () {
					done();
				});
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

				it("Then I am told I have no tasks to do and can have pizza", function () {
					expect(browser.text('#no-current-tasks')).to.contain("Hurray! You've done everything you need to today. Pizza for dinner!");
				});

				describe("And I click the delete task button for this", function (done) {
					before(function (done) {
						browser.clickLink('.task .delete-task', done);
					});
					describe("And I click Yes I'm sure", function (done) {
						before(function (done) {
							browser.clickLink('.task .delete-task-yes', done);
						});

						it("Then I can no longer see the task listed", function () {
							expect(browser.text('.task')).to.not.contain(existingTasks[0].text);
						});

						it("And I am told the task has been deleted", function () {
							expect(browser.text('#info-box')).to.contain("Your task has been deleted");
						});
					});

				});
			});
		});
	});
});