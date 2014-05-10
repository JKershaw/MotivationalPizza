var assert = require('assert'),
	MpApp = require('../../lib/app/MpApp');

test("Given many tags exist, return the most popular one", function (done) {

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
		text: results[1].tags[1].text
	}],
		userId = 1;

	var mpApp = new MpApp(new FakeRepository(results));

	mpApp.query.popularTagsByUserId(userId, 1, function (returnedTags) {

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