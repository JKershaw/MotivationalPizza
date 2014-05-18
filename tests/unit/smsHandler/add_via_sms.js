var assert = require('assert'),
	SmsHandler = require("../../../lib/util/SmsHandler");

test("I can add a task via an SMS message", function (done) {

	var usersRepository = new FakeRepository([]),
		tasksRepository = new FakeRepository([]),
		fakeResponse = new FakeResponse();

	smsHandler = new SmsHandler(tasksRepository, usersRepository);

	var fakeSmsBody = {
		Body: "newTaskText",
		From: '+449876543210'
	};

	smsHandler.handle(fakeSmsBody, fakeResponse, function (success) {

		assert.equal(success, true);
		assert.equal(responseSendValue, "Your task has been added.");
		assert.equal(repositorySavedTask.text, fakeSmsBody.Body);
		assert.equal(repositorySavedTask.status, "open");
		done();

	});
});

test("When I get an SMS without a valid number, error is returned", function (done) {

	var usersRepository = new FakeRepository([]),
		tasksRepository = new FakeRepository([]),
		fakeResponse = new FakeResponse();

	smsHandler = new SmsHandler(tasksRepository, usersRepository);

	var fakeSmsBody = {
		Body: "newTaskText",
		From: '+440123456789'
	};

	smsHandler.handle(fakeSmsBody, fakeResponse, function (success) {

		assert.equal(success, false);
		assert.equal(responseSendValue, "Sorry, we didn't recognise your phone number. Check it's right on your profile.");
		assert.equal(repositorySavedTask, false);
		done();

	});
});

test("When I add a task via an SMS message and there's 5 today tasks, it's marked for tomorrow ", function (done) {

	var usersRepository = new FakeRepository([]),
		tasksRepository = new FakeRepository([{}, {}, {}, {}, {}]),
		fakeResponse = new FakeResponse();

	smsHandler = new SmsHandler(tasksRepository, usersRepository);

	var fakeSmsBody = {
		Body: "newTaskText",
		From: '+449876543210'
	};

	smsHandler.handle(fakeSmsBody, fakeResponse, function (success) {

		assert.equal(success, true);
		assert.equal(responseSendValue, "This task has been added to Tomorrow's list.");
		assert.equal(repositorySavedTask.text, fakeSmsBody.Body);
		assert.equal(repositorySavedTask.status, "tomorrow");
		done();

	});
});

var repositorySavedTask;

var FakeRepository = function (findResults) {

	repositorySavedTask = false;

	function save(object, callback) {
		repositorySavedTask = object;
		callback(true);
	}

	function find(query, callback) {
		callback(findResults);
	}

	function findByPhoneNumber(phoneNumber, callback) {

		var results = [];
		if (phoneNumber == "9876543210") {
			results = [{
				_id: "1"
			}];
		}

		callback(results);
	}

	function findById(query, callback) {
		var results = [{}];
		callback(results);
	}

	return {
		find: find,
		save: save,
		findByPhoneNumber: findByPhoneNumber,
		findById: findById
	};
};

var responseSendValue;

var FakeResponse = function () {

	function set(thing, val) {}

	function send(val) {
		responseSendValue = val;
	}

	return {
		set: set,
		send: send
	};
};