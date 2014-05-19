var mongojs = require('mongojs'),
	db = mongojs.connect(process.env.MONGO_CONNECTION_STRING, ["events"]);

module.exports = function (clock) {

	function save(eventType, eventData, callback) {

		var eventObject = {
			timestamp: clock.getTime(),
			type: eventType,
			data: eventData
		};

		db.events.save(eventObject, function (err, saved) {
			callback();
		});
	}

	function latestEvent(callback) {

		var sortFilter = {
			timestamp: -1
		};

		db.events.find({}).sort(sortFilter).limit(1).toArray(function (err, events) {
			callback(events[0]);
		});
	}

	return {
		save: save,
		latestEvent: latestEvent
	};
};