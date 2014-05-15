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
	text: "This task is gonna get split!",
	tag: "Kittens"
}], splitTask1 = [{
	text: "A whole new task!",
	tag: "Kittens, puppies"
}], splitTask2 = [{
	text: "A different task",
	tag: ""
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

		describe("And I click the Split button for the task", function (done) {
			before(function (done) {
				browser.clickLink('.task .split-task', done);
			});

			it("Then I am prompted to split the task", function () {
				expect(browser.text("#split-task-instructions")).to.contain("Split your task in two");
			});

			it("And the existing task text is visible", function () {
				expect(browser.query("#original-task-text[value='" + existingTasks[0].text + "']")).to.exist;
			});

			it("And the task's tag is now listed", function () {
				expect(browser.query('#original-task-tags[value="' + existingTasks[0].tag + '"]')).to.exist;
			});

			it("And the existing task text is used for the new tasks", function () {
				expect(browser.query("#task1-text[value='" + existingTasks[0].text + "']")).to.exist;
				expect(browser.query("#task2-text[value='" + existingTasks[0].text + "']")).to.exist;
			});

			it("And the existing task's tag is now listed for the new tasks", function () {
				expect(browser.query('#task1-tags[value="' + existingTasks[0].tag + '"]')).to.exist;
				expect(browser.query('#task2-tags[value="' + existingTasks[0].tag + '"]')).to.exist;
			});

			describe("When I enter the new tasks", function () {
				before(function (done) {
					browser.fill("#task1-text", splitTask1.text);
					browser.fill("#task1-tags", splitTask1.tag);
					browser.fill("#task2-text", splitTask2.text);
					browser.fill("#task2-tags", splitTask2.tag);
					browser.pressButton("Split Task", done);
				});

				it("Then I am told the task has been split", function () {
					expect(browser.text('#info-box')).to.contain("Your task has been split");
				});

				it("And the new tasks are now listed", function () {
					expect(browser.text('.task-open')).to.contain(splitTask1.text);
					expect(browser.text('.task-open')).to.contain(splitTask2.text);
				});

				it("And the new tasks' tags is now also listed", function () {
					expect(browser.text('.task-open .tag')).to.contain(splitTask1.tag);
					expect(browser.text('.task-open .tag')).to.contain(splitTask2.tag);
				});

				it("And the old task doesn't exist", function () {
					expect(browser.text('.task-open')).to.not.contain(existingTasks[0].text);
				});
			});
		});
	});
});