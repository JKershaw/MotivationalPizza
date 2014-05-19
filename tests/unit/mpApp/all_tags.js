var assert = require('assert'),
	MpAppBuilder = require('../../../lib/util/MpAppBuilder');

test("Given one tag exists for three tasks, return them when allTags is called", function (done) {

	var results = [{
		tags: [{
			text: "first tag"
		}]
	}, {
		tags: [{
			text: "second"
		}]
	}, {
		tags: [{
			text: "Lambs!"
		}]
	}];

	var expectedTags = [{
		text: results[0].tags[0].text,
		popularity: 1
	}, {
		text: results[1].tags[0].text,
		popularity: 1
	}, {
		text: results[2].tags[0].text,
		popularity: 1
	}],
		userId = 1;

	var mpApp = new MpAppBuilder().build(new FakeRepository(results), new FakeRepository());

	mpApp.query.allTagsByUserId(userId, function (returnedTags) {

		assert.deepEqual(returnedTags, expectedTags);
		done();

	});
});

test("Given several tags exists for several tasks, return them when allTags is called without duplications", function (done) {

	var results = [{
		tags: [{
			text: "first tag"
		},{
			text: "woop"
		}]
	}, {
		tags: [{
			text: "second"
		}]
	}, {
		tags: [{
			text: "Lambs!"
		}, {
			text: "Kittens!"
		}, {
			text: "woop"
		}, {
			text: "Puppies!"
		}]
	}];

	var expectedTags = [{
		text: results[0].tags[0].text,
		popularity: 1
	},{
		text: results[0].tags[1].text,
		popularity: 2
	}, {
		text: results[1].tags[0].text,
		popularity: 1
	}, {
		text: results[2].tags[0].text,
		popularity: 1
	}, {
		text: results[2].tags[1].text,
		popularity: 1
	}, {
		text: results[2].tags[3].text,
		popularity: 1
	}],
		userId = 1;

	var mpApp = new MpAppBuilder().build(new FakeRepository(results), new FakeRepository());

	mpApp.query.allTagsByUserId(userId, function (returnedTags) {

		assert.deepEqual(returnedTags, expectedTags);
		done();

	});
});

var FakeRepository = function (results) {

	function find(query, callback) {
		callback(results);
	}
	
	return {
		find: find
	};
};