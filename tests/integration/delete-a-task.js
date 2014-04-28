/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie');

require('chai').should();

var browser = new Browser({
	site: "http://localhost:3000"
});

var command = new require("../../lib/Command")();
query = new require("../../lib/Query")();

var task = {
	text: "Go to the moon"
};

describe('Given a task exists', function (done) {

	var task_id;

	before(function (done) {
		command.addTask(task.text, function () {
			query.find(task.text, function (task) {
				task_id = task._id;
				done();
			});
		});
	});

	describe("And I visit the home page", function (done) {
		before(function (done) {
			browser.visit('/', done);
		});

		it("Then I can see the task listed", function () {
			expect(browser.text('.task[data-task-id="' + task_id + '"]')).to.contain(task.text);
		});
	});

	describe("And I click the delete task button for this", function (done) {
		before(function (done) {
			browser.clickLink('.task[data-task-id="' + task_id + '"] > .delete-task', done);
		});

		it("Then I can no longer see the task listed", function () {
			expect(browser.text('.task')).to.not.contain(task.text);
		});
	});
});