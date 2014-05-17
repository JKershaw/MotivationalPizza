var assert = require('assert'),
	MpApp = require('../../lib/app/MpApp');

test("Given a few tags exist, return the most popular one", function (done) {

	var results = [{
		tags: [{
			text: "first tag"
		}]
	}, {
		tags: [{
			text: "second"
		}, {
			text: "Lambs!"
		}, ]
	}, {
		tags: [{
			text: "Lambs!"
		}]
	}];

	var expectedTags = [{
		text: results[1].tags[1].text,
		popularity: 2
	}],
		userId = 1;

	var mpApp = new MpApp(new FakeRepository(results), new FakeRepository([]));

	mpApp.query.popularTagsByUserId(userId, 1, function (returnedTags) {

		assert.deepEqual(returnedTags, expectedTags);
		done();

	});
});


test("Given a many tags exist, return the most popular one", function (done) {

	var results = [{
		tags: [{
			text: "first tag"
		}, {
			text: "Lambs!"
		}]
	}, {
		tags: [{
			text: "second"
		}, {
			text: "Lambs!"
		}, {
			text: "Kittens!"
		}, {
			text: "womp!"
		}, {
			text: "fingers!"
		} ]
	}, {
		tags: [{
			text: "Kittens!"
		}, {
			text: "Lambs!"
		}]
	}];

	var expectedTags = [{
		text: "Lambs!",
		popularity: 3
	}, {
		text: "Kittens!",
		popularity: 2
	}],
		userId = 1;

	var mpApp = new MpApp(new FakeRepository(results));

	mpApp.query.popularTagsByUserId(userId, 2, function (returnedTags) {

		assert.deepEqual(returnedTags, expectedTags);
		done();

	});
});


test("Given 6 tags exist and I try to return 10, return only 5", function (done) {

	var results = [{
		tags: [{
			text: "first tag"
		}, {
			text: "Lambs!"
		}]
	}, {
		tags: [{
			text: "second"
		}, {
			text: "Lambs!"
		}, {
			text: "Kittens!"
		}, {
			text: "womp!"
		}, {
			text: "fingers!"
		} ]
	}];

	var userId = 1;

	var mpApp = new MpApp(new FakeRepository(results));

	mpApp.query.popularTagsByUserId(userId, 10, function (returnedTags) {

		assert.equal(returnedTags.length, 6);
		done();

	});
});

var FakeRepository = function (results) {

	function find(query, callback) {
		callback(results);
	}
	function findById(query, callback) {
		callback([]);
	}

	return {
		find: find,
		findById: findById
	};
};