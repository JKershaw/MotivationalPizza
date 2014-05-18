var assert = require('assert'),
	TodayFullSpecification = require("../../../lib/app/specifications/TodayFullSpecification");

test("Given a user has no preference and 1 task exists for today, return false", function (done) {

	var tasksRepository = new FakeTasksRepository([{}]),
		usersRepository = new FakeUsersRepository({}),
		todayFullSpecification = new TodayFullSpecification(tasksRepository, usersRepository);

	var userId = 1;

	todayFullSpecification.isSatisfiedBy(userId, function (todayIsFull) {

		assert.equal(todayIsFull, false);
		done();

	});
});

test("Given a user has no preference and 5 tasks exists for today, return true", function (done) {

	var tasksRepository = new FakeTasksRepository([{}, {}, {}, {}, {}]),
		usersRepository = new FakeUsersRepository({}),
		todayFullSpecification = new TodayFullSpecification(tasksRepository, usersRepository);

	var userId = 2;

	todayFullSpecification.isSatisfiedBy(userId, function (todayIsFull) {

		assert.equal(todayIsFull, true);
		done();

	});
});

test("Given a user a preference for 10 today days max, and 5 tasks exists for today, return false", function (done) {

	var tasksRepository = new FakeTasksRepository([{}, {}, {}, {}, {}]),
		usersRepository = new FakeUsersRepository({
			maxTodayTaskCount: "10"
		}),
		todayFullSpecification = new TodayFullSpecification(tasksRepository, usersRepository);

	var userId = 2;

	todayFullSpecification.isSatisfiedBy(userId, function (todayIsFull) {

		assert.equal(todayIsFull, false);
		done();

	});
});

test("Given a user a preference for 10 today days max, and 10 tasks exists for today, return true", function (done) {

	var tasksRepository = new FakeTasksRepository([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]),
		usersRepository = new FakeUsersRepository({
			maxTodayTaskCount: "10"
		}),
		todayFullSpecification = new TodayFullSpecification(tasksRepository, usersRepository);

	var userId = 2;

	todayFullSpecification.isSatisfiedBy(userId, function (todayIsFull) {

		assert.equal(todayIsFull, true);
		done();

	});
});

test("Given a user a preference for 3 today days max, and 2 tasks exists for today, return false", function (done) {

	var tasksRepository = new FakeTasksRepository([{}, {}]),
		usersRepository = new FakeUsersRepository({
			maxTodayTaskCount: "3"
		}),
		todayFullSpecification = new TodayFullSpecification(tasksRepository, usersRepository);

	var userId = 2;

	todayFullSpecification.isSatisfiedBy(userId, function (todayIsFull) {

		assert.equal(todayIsFull, false);
		done();

	});
});

test("Given a user a preference for 3 today days max, and 3 tasks exists for today, return true", function (done) {

	var tasksRepository = new FakeTasksRepository([{}, {}, {}]),
		usersRepository = new FakeUsersRepository({
			maxTodayTaskCount: "3"
		}),
		todayFullSpecification = new TodayFullSpecification(tasksRepository, usersRepository);

	var userId = 2;

	todayFullSpecification.isSatisfiedBy(userId, function (todayIsFull) {

		assert.equal(todayIsFull, true);
		done();

	});
});

var FakeTasksRepository = function (findResults) {

	function find(query, callback) {
		callback(findResults);
	}

	return {
		find: find
	};
};

var FakeUsersRepository = function (findResults) {

	function findById(userId, callback) {
		callback(findResults);
	}

	return {
		findById: findById
	};
};