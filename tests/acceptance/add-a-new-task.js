/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie'),
	user = new require("./util/User")();

require('chai').should();

var browser = new Browser({
	site: "http://localhost:3000"
});

var task = {
	text: "Do the washing up http://hereisalink.com",
	tag: "Tagging"
};

describe('Given I sign up and visit the home page', function (done) {

	before(function (done) {
		user.signup(browser, function () {
			browser.visit('/', done);
		});
	});

	it("Then I am told I have no current tasks", function () {
		expect(browser.text("#no-current-tasks")).to.contain("Oh sweet, you currently have no tasks to do.");
	});

	it("And there are no alerts", function () {
		expect(browser.query('#info-box')).to.not.exist;
	});

	describe("When I click the Add New Task button", function (done) {
		before(function (done) {
			browser.clickLink('Add New Task', done);
		});

		it("Then I am propmpted to enter the task", function () {
			expect(browser.text("#enter-task-instructions")).to.contain("Your new task");
		});

		describe("When I enter the new task and tag", function () {
			before(function (done) {
				browser.fill("#task-text", task.text);
				browser.fill("#task-tags", task.tag);
				browser.pressButton("Add Task", done);
			});

			it("Then I am told the task has been saved", function () {
				expect(browser.text('#info-box')).to.contain("Your new task has been added");
			});

			it("And the task is now listed", function () {
				expect(browser.text('.task-open')).to.contain(task.text);
			});

			it("And the task's tag is now also listed", function () {
				expect(browser.text('.task-open .tag')).to.contain(task.tag);
			});

			it("And a link is included in the text", function () {
				expect(browser.query('.task-open a[href="http://hereisalink.com"]')).to.exist;
			});

			it("Then I am not told I have no current tasks", function () {
				expect(browser.query('#no-current-tasks')).to.not.exist;
			});

			describe('Given I sign up again as a different user and visit the home page', function (done) {

				before(function (done) {
					user.signup(browser, function () {
						browser.visit('/', done);
					});
				});

				it("Then I am told I have no current tasks", function () {
					expect(browser.text("#no-current-tasks")).to.contain("Oh sweet, you currently have no tasks to do.");
				});
			});

		});
	});
});