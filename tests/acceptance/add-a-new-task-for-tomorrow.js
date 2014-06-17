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
	text: "Sit in the garden and read a nice book",
	tag: "Tagging"
};

describe('Given I sign up and visit the home page', function (done) {

	before(function (done) {
		user.signup(browser, function () {
			browser.visit('/', done);
		});
	});

	describe("When I click the Add New Task button", function (done) {
		before(function (done) {
			browser.clickLink('Add New Task', done);
		});

		describe("When I enter the new task and tag, and select Soon is when i want it done", function () {
			before(function (done) {
				browser.fill("#task-text", task.text);
				browser.fill("#task-tags", task.tag);
				browser.choose("Soon");
				browser.pressButton("Add Task", done);
			});

			it("Then I am told the task has been saved", function () {
				expect(browser.text('#info-box')).to.contain("Your new task has been added");
			});

			it("And the task is now listed", function () {
				expect(browser.text('.task-tomorrow')).to.contain(task.text);
			});

			describe("When I click the Add New Task button", function (done) {
				before(function (done) {
					browser.clickLink('Add New Task', done);
				});

				describe("When I enter the new task and tag, and select Some Other Time is when i want it done", function () {
					before(function (done) {
						browser.fill("#task-text", task.text);
						browser.fill("#task-tags", task.tag);
						browser.choose("Some other time");
						browser.pressButton("Add Task", done);
					});

					it("Then I am told the task has been saved", function () {
						expect(browser.text('#info-box')).to.contain("Your new task has been added");
					});

					it("And the task is now listed", function () {
						expect(browser.text('.task-not-today')).to.contain(task.text);
					});

				});
			});

		});
	});
});