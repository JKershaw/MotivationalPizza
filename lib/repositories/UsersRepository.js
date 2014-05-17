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
		var idObject = buildId(id);

		findOne({
			_id: idObject
		}, callback);
	}

	function findByPhoneNumber(phoneNumber, callback) {
		findOne({
			phoneNumber: phoneNumber
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

	function update(query, updateRequest, callback) {
		var updateQuery = {
			$set: updateRequest
		},
			multi = {
				multi: false
			};

		db.users.update(query, updateQuery, multi, function () {
			callback();
		});
	}
	
	function buildId(id) {
		var ObjectId = mongojs.ObjectId;
		try {
			return ObjectId(String(id));
		} catch (e) {
			return undefined;
		}
	}

	function buildQuery(id) {
		return {
			_id: buildId(id)
		};
	}

	return {
		find: find,
		findOne: findOne,
		findById: findById,
		findByPhoneNumber: findByPhoneNumber,
		findByUsername: findByUsername,
		save: save,
		update: update,
		buildQuery: buildQuery
	};
};