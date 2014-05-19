var assert = require('assert'),
	MpAppCommand = require('../../../lib/app/Command');

var newTask = {
	user: "1",
	status: "open"
};

var eventStoreUsed, eventTypeSaved;


test("When I add a task, the event store is used", function (done) {

	var mpAppCommand = new MpAppCommand(new FakeEventStore(), new Date(), new FakeRepository(), new FakeRepository());
	eventStoreUsed = false;
	eventTypeSaved = false;

	mpAppCommand.add(newTask, function (success) {
		assert.equal(eventStoreUsed, true);
		assert.equal(eventTypeSaved, "addTask");
		done();
	});
});

test("When I remove a task, the event store is used", function (done) {

	var mpAppCommand = new MpAppCommand(new FakeEventStore(), new Date(), new FakeRepository(), new FakeRepository());
	eventStoreUsed = false;
	eventTypeSaved = false;

	mpAppCommand.remove(newTask, function (success) {
		assert.equal(eventStoreUsed, true);
		assert.equal(eventTypeSaved, "removeTask");
		done();
	});
});

test("When I markAsDone a task, the event store is used", function (done) {

	var mpAppCommand = new MpAppCommand(new FakeEventStore(), new Date(), new FakeRepository(), new FakeRepository());
	eventStoreUsed = false;
	eventTypeSaved = false;

	mpAppCommand.markAsDone(newTask, function (success) {
		assert.equal(eventStoreUsed, true);
		assert.equal(eventTypeSaved, "markTaskAsDone");
		done();
	});
});

test("When I markAsToday a task, the event store is used", function (done) {

	var mpAppCommand = new MpAppCommand(new FakeEventStore(), new Date(), new FakeRepository(), new FakeRepository());
	eventStoreUsed = false;
	eventTypeSaved = false;

	mpAppCommand.markAsToday(newTask, function (success) {
		assert.equal(eventStoreUsed, true);
		assert.equal(eventTypeSaved, "markTaskAsToday");
		done();
	});
});

test("When I markAsNotToday a task, the event store is used", function (done) {

	var mpAppCommand = new MpAppCommand(new FakeEventStore(), new Date(), new FakeRepository(), new FakeRepository());
	eventStoreUsed = false;
	eventTypeSaved = false;

	mpAppCommand.markAsNotToday(newTask, function (success) {
		assert.equal(eventStoreUsed, true);
		assert.equal(eventTypeSaved, "markTaskAsNotToday");
		done();
	});
});

test("When I markAsTomorrow a task, the event store is used", function (done) {

	var mpAppCommand = new MpAppCommand(new FakeEventStore(), new Date(), new FakeRepository(), new FakeRepository());
	eventStoreUsed = false;
	eventTypeSaved = false;

	mpAppCommand.markAsTomorrow(newTask, function (success) {
		assert.equal(eventStoreUsed, true);
		assert.equal(eventTypeSaved, "markTaskAsTomorrow");
		done();
	});
});

test("When I updateText a task, the event store is used", function (done) {

	var mpAppCommand = new MpAppCommand(new FakeEventStore(), new Date(), new FakeRepository(), new FakeRepository());
	eventStoreUsed = false;
	eventTypeSaved = false;

	mpAppCommand.updateText(newTask, "some text", function (success) {
		assert.equal(eventStoreUsed, true);
		assert.equal(eventTypeSaved, "updateTaskText");
		done();
	});
});

test("When I bump a task, the event store is used", function (done) {

	var mpAppCommand = new MpAppCommand(new FakeEventStore(), new Date(), new FakeRepository(), new FakeRepository());
	eventStoreUsed = false;
	eventTypeSaved = false;

	mpAppCommand.bump(newTask, function (success) {
		assert.equal(eventStoreUsed, true);
		assert.equal(eventTypeSaved, "bumpTask");
		done();
	});
});

test("When I addTags a task, the event store is used", function (done) {

	var mpAppCommand = new MpAppCommand(new FakeEventStore(), new Date(), new FakeRepository(), new FakeRepository());
	eventStoreUsed = false;
	eventTypeSaved = false;

	mpAppCommand.addTags(newTask, [], function (success) {
		assert.equal(eventStoreUsed, true);
		assert.equal(eventTypeSaved, "addTaskTags");
		done();
	});
});

test("When I saveUser a task, the event store is used", function (done) {

	var mpAppCommand = new MpAppCommand(new FakeEventStore(), new Date(), new FakeRepository(), new FakeRepository());
	eventStoreUsed = false;
	eventTypeSaved = false;

	mpAppCommand.saveUser({}, function (success) {
		assert.equal(eventStoreUsed, true);
		assert.equal(eventTypeSaved, "saveUser");
		done();
	});
});

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

var FakeRepository = function () {

	function save(object, callback) {
		callback(true);
	}

	function update(query, updateRequest, callback) {
		callback(true);
	}

	function remove(object, callback) {
		callback(true);
	}

	function find(query, callback) {
		callback([{}]);
	}

	function findById(query, callback) {
		callback([{}]);
	}

	function buildQuery() {
		return {};
	}

	return {
		save: save,
		find: find,
		findById: findById,
		buildQuery: buildQuery,
		update: update,
		remove: remove
	};
};