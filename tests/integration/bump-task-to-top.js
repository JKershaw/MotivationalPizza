/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie'),
	user = new require("./util/User")(),
	tasks = new require("./util/Tasks")();

require('chai').should();

var browser = new Browser({
	site: "http://localhost:3000"
});

var existingTasks = [{
	text: "Do some flips"
}, {
	text: "Ride a dolphin"
}, {
	text: "Eat a burger"
}];

describe('Given several tasks exists', function (done) {

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

		it("Then the most recently added task is at the top", function () {
			expect(browser.text('.task-open[data-i="0"]')).to.contain(existingTasks[2].text);
		});

		it("Then the least recently added task is at the bottom", function () {
			expect(browser.text('.task-open[data-i="2"]')).to.contain(existingTasks[0].text);
		});

		describe("And I click the Bump button for the last task", function (done) {
			before(function (done) {
				browser.clickLink('.task-open[data-i="2"] .bump-task', done);
			});

			it("Then the most recently added task is second in the list", function () {
				expect(browser.text('.task-open[data-i="1"]')).to.contain(existingTasks[2].text);
			});

			it("Then the least recently added task is at the top", function () {
				expect(browser.text('.task-open[data-i="0"]')).to.contain(existingTasks[0].text);
			});

			it("And I am told the task has been updated", function () {
				expect(browser.text('#info-box')).to.contain("Your task has been updated");
			});
		});
	});
});