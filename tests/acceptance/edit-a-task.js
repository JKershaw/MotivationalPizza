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
	text: "Edit this task"
}],
	editedTask = {
		text: "This has now been edited! hurray!",
		tag: "I'm adding this tag.",
		dueDate: "2014-1-20"
	};

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

		describe("And I click the Edit button for the task", function (done) {
			before(function (done) {
				browser.clickLink('.task .edit-task', done);
			});

			it("Then I am prompted to edit the task", function () {
				expect(browser.text("#edit-task-instructions")).to.contain("Edit your task");
			});

			it("And the existing task text is visible", function () {
				expect(browser.query("#task-text[value='" + existingTasks[0].text + "']")).to.exist;
			});

			describe("When I enter the new text", function () {
				before(function (done) {
					browser.fill("#task-text", editedTask.text);
					browser.fill("#task-tags", editedTask.tag);
					browser.fill("#task-duedate", editedTask.dueDate);
					browser.pressButton("Edit Task", done);
				});

				it("Then I am told the task has been saved", function () {
					expect(browser.text('#info-box')).to.contain("Your task has been updated");
				});

				it("And the task is now listed", function () {
					expect(browser.text('.task-open')).to.contain(editedTask.text);
				});

				it("And the task's tag is now also listed", function () {
					expect(browser.text('.task-open .tag')).to.contain(editedTask.tag);
				});

				describe("And I click the Edit button for the task", function (done) {
					before(function (done) {
						browser.clickLink('.task .edit-task', done);
					});

					it("And the task's tag is now listed", function () {
						expect(browser.query('#task-tags[value="' + editedTask.tag + '"]')).to.exist;
					});

					it("And the task's duedate is listed", function () {
						expect(browser.query('#task-duedate[value="' + editedTask.dueDate + '"]')).to.exist;
					});
				});
			});
		});
	});
});