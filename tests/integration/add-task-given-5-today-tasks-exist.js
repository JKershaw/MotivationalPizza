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
	text: "Womp womp womp"
},
	existingTodayTask = {
		text: "This task is for today"
	};

describe('Given five tasks for today exist', function (done) {

	var task_id;

	before(function (done) {
		taskCommand.add(existingTodayTask.text, function () {
			taskCommand.add(existingTodayTask.text, function () {
				taskCommand.add(existingTodayTask.text, function () {
					taskCommand.add(existingTodayTask.text, function () {
						taskCommand.add(existingTodayTask.text, function () {

							done();

						});
					});
				});
			});
		});
	});

	describe("Then I visit the home page", function (done) {
		before(function (done) {
			browser.visit("/", done);
		});

		it('And the Add New Task button is disabled', function () {
			expect(browser.query('a[href="/NewTask"].disabled')).to.exist;
		});

		describe("Then I visit the Add New Task page", function (done) {
			before(function (done) {
				browser.visit("/NewTask", done);
			});

			describe("When I enter the new task", function () {
				before(function (done) {
					browser.fill("#task-text", task.text);
					browser.pressButton("Add Task", done);
				});

				it("And I am told there are too many things to do today as is", function () {
					expect(browser.text('#info-box')).to.contain("Nope, sorry. You already have enough things to do today.");
				});

			});
		});
	});
});