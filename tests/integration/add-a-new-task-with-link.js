/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie');

require('chai').should();

var browser = new Browser({
	site: "http://localhost:3000"
});

var task = {
	text: "Visit the website http://google.com"
}

describe('Given I visit the home page', function (done) {

	before(function (done) {
		browser.visit('/', done);
	});

	describe("When I click the Add New Task button", function (done) {
		before(function (done) {
			browser.clickLink('Add New Task', done);
		});

		describe("When I enter the new task", function () {
			before(function (done) {
				browser.fill("#task-text", task.text);
				browser.pressButton("Add Task", done);
			});

			it("And the task is now listed", function () {
				expect(browser.text('.task-open')).to.contain(task.text);
			});

			it("And a link is included in the text", function () {
				console.log(browser.html());
				expect(browser.query('.task-open a[href="http://google.com"]')).to.exist;
			});

		});
	});
});