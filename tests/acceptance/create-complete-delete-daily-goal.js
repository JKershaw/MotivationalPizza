/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie'),
	user = new require('./util/User')();

require('chai').should();

var browser = new Browser({
	site: "http://localhost:3000"
});

describe('Given I am logged in', function (done) {

	before(function (done) {
		user.signup(browser, done);
	});

	describe('Then I enter details for a new task', function (done) {

		before(function (done) {
			browser.fill("#newDailyGoalName", "Build a rocket ship");
			browser.pressButton("#newDailyGoalSubmit", done);
		});

		it("Then I can see the new goal listed", function () {
			expect(browser.text("#dailyGoals")).to.contain("Build a rocket ship");
		});

		describe('Then I mark the goal as complete', function (done) {

			before(function (done) {
				browser.clickLink(".dailyGoalCompleteLink", done);
			});

			it("Then I can see the new updated listed", function () {
				expect(browser.text(".dailyGoalCompleted")).to.contain("Build a rocket ship");
			});

			describe('Then I mark the goal as incomplete again', function (done) {

				before(function (done) {
					browser.clickLink(".dailyGoalIncompleteLink", done);
				});

				it("Then I can see the new updated listed", function () {
					expect(browser.text(".dailyGoalIncompleted")).to.contain("Build a rocket ship");
				});

				describe('Then I remove goal', function (done) {

					before(function (done) {
						browser.clickLink(".dailyGoalIncompleted .dailyGoalRemoveLink", done);
					});

					it("Then I can not see the goal listed", function () {
						expect(browser.text(".dailyGoalIncompleted")).not.to.contain("Build a rocket ship");
					});
				});
			});
		});
	});
});