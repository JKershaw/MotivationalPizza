var assert = require('assert'),
	DailyCutoffCalculator = require('../../lib/app/util/DailyCutoffCalculator');

test("Given a timestamp of now, return the timestamp for 3am this morning", function (done) {

	var dailyCutoffCalculator = new DailyCutoffCalculator();
		
	cutoffTimestamp = Date.today().add({
		hours: 3
	}).getTime();

	var returnedCutoffTimestamp = dailyCutoffCalculator.calculate();

	assert.equal(returnedCutoffTimestamp, cutoffTimestamp);
	done();
});