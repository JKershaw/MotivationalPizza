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
	text: "Edit this task"
}, editedTask = {
		text: "This has now been edited! hurray!"
	};

describe('Given a task exists', function (done) {

	var task_id;

	before(function (done) {
		taskCommand.add(task.text, function () {
			taskQuery.find(task.text, function (task) {
				task_id = task._id;
				done();
			});
		});
	});

	describe("And I visit the home page", function (done) {
		before(function (done) {
			browser.visit('/', done);
		});

		describe("And I click the Edit button for the task", function (done) {
			before(function (done) {
				browser.clickLink('.task[data-task-id="' + task_id + '"] .edit-task', done);
			});

			it("Then I am prompted to edit the task", function () {
				expect(browser.text("#edit-task-instructions")).to.contain("Edit your task");
			});

			it("And the existing task text is visible", function () {
				expect(browser.query("#task-text[value='" + task.text + "']")).to.exist;
			});

			describe("When I enter the new text", function () {
				before(function (done) {
					browser.fill("#task-text", editedTask.text);
					browser.pressButton("Edit Task", done);
				});

				it("Then I am told the task has been saved", function () {
					expect(browser.text('#info-box')).to.contain("Your task has been updated");
				});

				it("And the task is now listed", function () {
					expect(browser.text('.task-open')).to.contain(editedTask.text);
				});

			});
		});
	});
});