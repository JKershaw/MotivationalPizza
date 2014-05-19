var assert = require('assert'),
	MpApp = require('../../../lib/app/MpApp');

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

var mpApp = new MpApp(null, null, new FakeEventStore(), new FakeCommandModuleLoader());

test("When I run a command, the event store is used", function (done) {

	eventStoreUsed = false;
	eventTypeSaved = false;

	var commandName = "TaskAdd";

	mpApp.command(commandName, {task: newTask}, function (success) {
		assert.equal(eventStoreUsed, true);
		assert.equal(eventTypeSaved, commandName);
		done();
	});
});