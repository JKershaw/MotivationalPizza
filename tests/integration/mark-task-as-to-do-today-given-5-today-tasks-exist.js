/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie');

require('chai').should();

var browser = new Browser({
	site: "http://localhost:3000"
});

var taskCommand = new require("../../lib/TaskCommand")();
taskQuery = new require("../../lib/TaskQuery")();

var task = {
	text: "I can't make this task for Today"
},
	existingTodayTask = {
		text: "This task is for today"
	};

describe('Given a task for another day exists and five tasks for today exist', function (done) {

	var task_id;

	before(function (done) {
		taskCommand.add(task.text, function () {
			taskCommand.add(existingTodayTask.text, function () {
				taskCommand.add(existingTodayTask.text, function () {
					taskCommand.add(existingTodayTask.text, function () {
						taskCommand.add(existingTodayTask.text, function () {
							taskCommand.add(existingTodayTask.text, function () {
								
								taskQuery.findByText(task.text, function (task) {
									taskCommand.markAsNotToday(task._id, function () {
										task_id = task._id;
										done();
									});
								});

							});
						});
					});
				});
			});
		});
	});

	describe("And I visit the home page", function (done) {
		before(function (done) {
			browser.visit('/', done);
		});

		describe("And I click the Today button for the task", function (done) {
			before(function (done) {
				browser.clickLink('.task[data-task-id="' + task_id + '"] .today-task', done);
			});

			it("Then I see the task not listed as for today", function () {
				expect(browser.text('.task-open')).to.not.contain(task.text);
			});

			it("Then I can no longer see the task still listed as not for today", function () {
				expect(browser.text('.task-not-today')).to.contain(task.text);
			});

			it("And I am told there are too many things to do today as is", function () {
				expect(browser.text('#info-box')).to.contain("Nope, sorry. You already have enough things to do today.");
			});
		});
	});
});