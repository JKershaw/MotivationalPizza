var mongojs = require('mongojs');

module.exports = function (collectionName) {

	var db = mongojs.connect(process.env.MONGO_CONNECTION_STRING, [collectionName]),
		collection = db[collectionName];

	function find(query, callback) {

		collection.find(query).toArray(function (err, allUsers) {
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

	function findByAttribute(attributeName, attributeValue, callback) {
		var query = {};

		query[attributeName] = attributeValue;

		findOne(query, callback);
	}

	function save(data, callback) {

		collection.save(data, function (err, saved) {
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

		collection.update(query, updateQuery, multi, function () {
			callback();
		});
	}


	function remove(id, callback) {

		var query = buildQuery(id);

		collection.remove(query, function () {
			callback(true);
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
		findByAttribute: findByAttribute,
		save: save,
		update: update,
		buildQuery: buildQuery,
		remove: remove
	};
};