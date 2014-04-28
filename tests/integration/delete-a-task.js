/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie');

require('chai').should();

var browser = new Browser({
	site: "http://localhost:3000"
});

var command = new require("../../lib/Command")();

var task = {
	text: "Go to the moon"
};

describe('Given a task exists', function (done) {

	before(function (done) {
		command.addTask(task.text, function () {
			done();
		});
	});

	describe("And I visit the home page", function (done) {
		before(function (done) {
			browser.visit('/', done);
		});

		it("Then I can see the task listed", function () {
			expect(browser.text('.task')).to.contain(task.text);
		});
	});
});