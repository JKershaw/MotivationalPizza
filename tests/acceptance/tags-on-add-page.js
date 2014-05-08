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
	text: "Do the washing up http://hereisalink.com",
	tag: "Tagging, some, things"
}];

describe('Given a task exist with tags', function (done) {

	before(function (done) {
		user.signup(browser, function () {
			tasks.add(existingTasks, browser, function () {
				done();
			});
		});
	});


	describe("When I click the Add New Task button", function (done) {
		before(function (done) {
			browser.visit("/", function(){
				browser.clickLink('Add New Task', done);
			});
		});

		it("Then I can see the tags", function () {
			expect(browser.text(".tag")).to.contain("Tagging");
			expect(browser.text(".tag")).to.contain("some");
			expect(browser.text(".tag")).to.contain("things");
		});
	});
});