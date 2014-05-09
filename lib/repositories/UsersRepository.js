var mongojs = require('mongojs'),
	db = mongojs.connect(process.env.MONGO_CONNECTION_STRING, ["users"]);

module.exports = function () {

	function find(query, callback) {

		db.users.find(query).toArray(function (err, allUsers) {
			callback(allUsers);
		});
	}

	function findOne(query, callback) {

		find(query, function (allUsers) {
			callback(allUsers[0]);
		});
	}

	function findById(id, callback) {
		var ObjectId = mongojs.ObjectId,
			id = ObjectId(String(id));

		findOne({
			_id: id
		}, callback);
	}

	function findByUsername(username, callback) {
		findOne({
			username: username
		}, callback);
	}

	function save(user, callback) {

		db.users.save(user, function (err, saved) {
			callback();
		});
	}

	return {
		find: find,
		findOne: findOne,
		findById: findById,
		findByUsername: findByUsername,
		save: save
	};
};