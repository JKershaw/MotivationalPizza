/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie'),
	user = new require("./util/User")(),
	tasks = new require("./util/Tasks")(),
	request = require('request');

var browser = new Browser({
	site: "http://localhost:3000"
}),
	newPhoneNumber = "6465491536",
	newTaskText = "Oh sweet, got this via SMS!";

var fake_request_body = {
	ToCountry: 'US',
	ToState: 'Something',
	SmsMessageSid: 'SM48996417d2cc3a63a6d4f715fdbe36b3',
	NumMedia: '0',
	ToCity: '',
	FromZip: '',
	SmsSid: 'SM48996417d2cc3a63a6d4f715fdbe36b3',
	FromState: '',
	SmsStatus: 'received',
	FromCity: '',
	Body: newTaskText,
	FromCountry: 'GB',
	To: '+123456789',
	ToZip: '',
	MessageSid: 'SM48996417d2cc3a63a6d4f715fdbe36b3',
	AccountSid: 'AC3334c6a5fc4fb198c9d5cb96fe9fb9b5',
	From: '+1' + newPhoneNumber,
	ApiVersion: '2010-04-01'
};

describe("Given I'm logged in", function (done) {

	before(function (done) {
		user.signup(browser, function () {
			done();
		});
	});

	describe("And I visit the home page", function (done) {
		before(function (done) {
			browser.visit('/', done);
		});

		describe("And I click the profile link", function (done) {
			before(function (done) {
				browser.clickLink('#view-profile', done);
			});

			describe("And I edit my phone number", function (done) {
				before(function (done) {
					browser.fill('#profile-usphonenumber', newPhoneNumber);
					browser.pressButton("Save Profile", done);
				});

				describe("And I send a text", function (done) {
					before(function (done) {
						var url = 'http://localhost:3000/SMS';
						var opts = {
							url: url,
							method: 'post',
							form: fake_request_body
						};
						request(opts, function (err, res, body) {
							done();
						});
					});

					describe('Given I visit the home page', function (done) {

						before(function (done) {
							browser.visit('/', done);
						});

						it("And the task is now listed", function () {
							expect(browser.text('.task-open')).to.contain(newTaskText);
						});

					});
				});
			});
		});
	});
});