var assert = require('assert'),
	MpAppCommand = require('../../../lib/app/Command');

var FakeEventStore = function () {

	function save(eventType, eventData, callback) {
		eventStoreUsed = true;
		eventTypeSaved = eventType;
		callback();
	}

	return {
		save: save
	};
};

var FakeModule = function() {
	return {
		run: function (args, callback) {
			callback();
		}
	};
};

var FakeCommandModuleLoader = function () {

	function load(name) {
		return new FakeModule();
	}
	return {
		load: load
	};
};

var newTask = {
	user: "1",
	status: "open"
};

var eventStoreUsed, eventTypeSaved;

var mpAppCommand = new MpAppCommand(new FakeEventStore(), null, null, new FakeCommandModuleLoader());

test("When I run a command, the event store is used", function (done) {

	eventStoreUsed = false;
	eventTypeSaved = false;

	var commandName = "TaskAdd";

	mpAppCommand.run(commandName, {task: newTask}, function (success) {
		assert.equal(eventStoreUsed, true);
		assert.equal(eventTypeSaved, commandName);
		done();
	});
});

test("When I add a task, the event store is used", function (done) {

	eventStoreUsed = false;
	eventTypeSaved = false;

	mpAppCommand.add(newTask, function (success) {
		assert.equal(eventStoreUsed, true);
		assert.equal(eventTypeSaved, "TaskAdd");
		done();
	});
});

test("When I remove a task, the event store is used", function (done) {

	eventStoreUsed = false;
	eventTypeSaved = false;

	mpAppCommand.remove(newTask, function (success) {
		assert.equal(eventStoreUsed, true);
		assert.equal(eventTypeSaved, "TaskRemove");
		done();
	});
});

test("When I markAsDone a task, the event store is used", function (done) {

	eventStoreUsed = false;
	eventTypeSaved = false;

	mpAppCommand.markAsDone(newTask, function (success) {
		assert.equal(eventStoreUsed, true);
		assert.equal(eventTypeSaved, "TaskMarkAsDone");
		done();
	});
});

test("When I markAsToday a task, the event store is used", function (done) {

	eventStoreUsed = false;
	eventTypeSaved = false;

	mpAppCommand.markAsToday(newTask, function (success) {
		assert.equal(eventStoreUsed, true);
		assert.equal(eventTypeSaved, "TaskMarkAsToday");
		done();
	});
});

test("When I markAsNotToday a task, the event store is used", function (done) {

	eventStoreUsed = false;
	eventTypeSaved = false;

	mpAppCommand.markAsNotToday(newTask, function (success) {
		assert.equal(eventStoreUsed, true);
		assert.equal(eventTypeSaved, "TaskMarkAsSomeOtherTime");
		done();
	});
});

test("When I markAsTomorrow a task, the event store is used", function (done) {

	eventStoreUsed = false;
	eventTypeSaved = false;

	mpAppCommand.markAsTomorrow(newTask, function (success) {
		assert.equal(eventStoreUsed, true);
		assert.equal(eventTypeSaved, "TaskMarkAsTomorrow");
		done();
	});
});

test("When I updateText a task, the event store is used", function (done) {

	eventStoreUsed = false;
	eventTypeSaved = false;

	mpAppCommand.updateText(newTask, "some text", function (success) {
		assert.equal(eventStoreUsed, true);
		assert.equal(eventTypeSaved, "TaskUpdateText");
		done();
	});
});

test("When I bump a task, the event store is used", function (done) {

	eventStoreUsed = false;
	eventTypeSaved = false;

	mpAppCommand.bump(newTask, function (success) {
		assert.equal(eventStoreUsed, true);
		assert.equal(eventTypeSaved, "TaskBump");
		done();
	});
});

test("When I addTags a task, the event store is used", function (done) {

	eventStoreUsed = false;
	eventTypeSaved = false;

	mpAppCommand.addTags(newTask, [], function (success) {
		assert.equal(eventStoreUsed, true);
		assert.equal(eventTypeSaved, "TaskAddTags");
		done();
	});
});

test("When I saveUser a task, the event store is used", function (done) {

	eventStoreUsed = false;
	eventTypeSaved = false;

	mpAppCommand.saveUser({}, function (success) {
		assert.equal(eventStoreUsed, true);
		assert.equal(eventTypeSaved, "UserAdd");
		done();
	});
});