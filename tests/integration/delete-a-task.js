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
	text: "Go to the moon"
}];

describe('Given a task exists', function (done) {

	var task_id;

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