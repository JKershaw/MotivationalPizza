/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie');

require('chai').should();

var browser = new Browser({
	site: "http://localhost:3000"
});

describe('Given I visit the home page', function (done) {

	before(function (done) {
		browser.visit('/', done);
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
			expect(browser.text("#enter-task-instructions")).to.contain("Enter your new task details");
		});

		describe("When I enter the new task", function () {
			before(function (done) {
				browser.fill("#task-text", "Do the washing up");
				browser.pressButton("Add Task", done);
			});

			it("Then I am told the task has been saved", function () {
				expect(browser.text('#info-box')).to.contain("Your new task has been added");
			});

			it("And the task is now listed", function () {
				expect(browser.text('.task-open')).to.contain("Do the washing up");
			});

			it("Then I am not told I have no current tasks", function () {
				expect(browser.query('#no-current-tasks')).to.not.exist;
			});

		});
	});
});