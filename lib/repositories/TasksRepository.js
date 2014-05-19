var mongojs = require('mongojs'),
	db = mongojs.connect(process.env.MONGO_CONNECTION_STRING, ["tasks"]);

module.exports = function () {

	function find(query, callback) {

		db.tasks.find(query).sort({
			bumpedAt: -1
		}).toArray(function (err, allTasks) {
			callback(allTasks);
		});
	}

	function findOne(query, callback) {

		find(query, function (allTasks) {
			callback(allTasks[0]);
		});
	}

	function save(taskObect, callback) {

		db.tasks.save(taskObect, function (err, saved) {
			callback();
		});
	}

	function remove(query, callback) {

		db.tasks.remove(query, function () {
			callback(true);
		});
	}

	function update(query, updateRequest, callback) {
		var updateQuery = {
			$set: updateRequest
		},
			multi = {
				multi: false
			};

		db.tasks.update(query, updateQuery, multi, function () {
			callback();
		});
	}

	function buildId(id) {
		var ObjectId = mongojs.ObjectId;
		return ObjectId(String(id));
	}

	function buildQuery(id, userId) {
		return {
			_id: buildId(id),
			user: userId
		};
	}

	return {
		find: find,
		findOne: findOne,
		save: save,
		remove: remove,
		update: update,
		buildId: buildId,
		buildQuery: buildQuery
	};
};