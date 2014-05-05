/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie'),
	user = new require("./util/User")(),
	tasks = new require("./util/Tasks")();

var browser = new Browser({
	site: "http://localhost:3000"
});

var existingNotTodayTasks = [{
	text: "I can't make this task for Today"
}],
	existingTasks = [{
		text: "This task is for today"
	}, {
		text: "This task is for today"
	}, {
		text: "This task is for today"
	}, {
		text: "This task is for today"
	}, {
		text: "This task is for today"
	}];

describe('Given a task exists', function (done) {

	before(function (done) {
		user.signup(browser, function () {
			tasks.add(existingNotTodayTasks, browser, function () {
				done();
			});
		});
	});

	describe("Then I click the Not Today button for the task", function (done) {
		before(function (done) {
			browser.clickLink('.task .not-today-task', function () {
				done();
			});
		});

		describe('And Given five tasks for today exist', function (done) {
			before(function (done) {
				tasks.add(existingTasks, browser, function () {
					done();
				});
			});

			describe("And I visit the home page", function (done) {
				before(function (done) {
					browser.visit('/', done);
				});

				describe("And I click the Today button for the task", function (done) {
					before(function (done) {
						browser.clickLink('.task-not-today .today-task', done);
					});

					it("Then I see the task not listed as for today", function () {
						expect(browser.text('.task-open')).to.not.contain(existingNotTodayTasks[0].text);
					});

					it("Then I can no longer see the task still listed as not for today", function () {
						expect(browser.text('.task-not-today')).to.contain(existingNotTodayTasks[0].text);
					});

					it("And I am told there are too many things to do today as is", function () {
						expect(browser.text('#info-box')).to.contain("Nope, sorry. You already have enough things to do today.");
					});
				});
			});
		});
	});
});