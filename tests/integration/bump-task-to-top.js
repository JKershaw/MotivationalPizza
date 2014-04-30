/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie');

require('chai').should();

var browser = new Browser({
	site: "http://localhost:3000"
});

var taskCommand = new require("../../lib/TaskCommand")(),
	taskQuery = new require("../../lib/TaskQuery")();

var task1 = {
	text: "Do some flips"
}, task2 = {
		text: "Ride a dolphin"
	}, task3 = {
		text: "Eat a burger"
	};

describe('Given several tasks exists', function (done) {

	var task1_id,
		task2_id,
		task3_id;

	before(function (done) {
		taskCommand.add(task1.text, function () {
			taskQuery.findByText(task1.text, function (task) {
				task1_id = task._id;
				taskCommand.add(task2.text, function () {
					taskQuery.findByText(task2.text, function (task) {
						task2_id = task._id;
						taskCommand.add(task3.text, function () {
							taskQuery.findByText(task3.text, function (task) {
								task3_id = task._id;
								done();
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

		it("Then the most recently added task is at the top", function () {
			expect(browser.text('.task-open[data-i="0"]')).to.contain(task3.text);
		});

		it("Then the least recently added task is at the bottom", function () {
			expect(browser.text('.task-open[data-i="2"]')).to.contain(task1.text);
		});

		describe("And I click the Bump button for the last task", function (done) {
			before(function (done) {
				browser.clickLink('.task-open[data-i="2"] .bump-task', done);
			});

			it("Then the most recently added task is second in the list", function () {
				expect(browser.text('.task-open[data-i="1"]')).to.contain(task3.text);
			});

			it("Then the least recently added task is at the top", function () {
				expect(browser.text('.task-open[data-i="0"]')).to.contain(task1.text);
			});

			it("And I am told the task has been updated", function () {
				expect(browser.text('#info-box')).to.contain("Your task has been updated");
			});
		});
	});
});