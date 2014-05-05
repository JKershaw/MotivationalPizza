var assert = require('assert'),
	TaskQuery = require("../../lib/TaskQuery");

test("Given a timestamp of now, return the timestamp for 3am this morning", function (done) {

	var fakeRequest = {
		user: false
	},
		taskQuery = new TaskQuery(fakeRequest);
		
	cutoffTimestamp = Date.today().add({
		hours: 3
	}).getTime();

	var returnedCutoffTimestamp = taskQuery.calulateDailyCutoff();

	assert.equal(returnedCutoffTimestamp, cutoffTimestamp);
	done();
});