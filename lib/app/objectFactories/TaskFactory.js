module.exports = function () {

	function build(input, callback) {

		var task = buildTask(input);

		callback(task);
	}

	function buildSeveral(inputArray, callback) {
		var tasks = [];

		for (var i = 0; i < inputArray.length; i++) {
			tasks.push(buildTask(inputArray[i]));
		}

		callback(tasks);

	}

	function buildTask(input) {

		if (!input) {
			return input;
		}
		
		var task = {
			text: input.text,
			status: input.status,
			user: input.user,
			tags: input.tags,
			created: input.created,
			bumpedAt: input.bumpedAt,
			_id: input._id
		};

		if (input.status == "open") {
			task.isDueToday = true;
			task.isDueTomorrow = false;
			task.isDueSomeOtherTime = false;
		}

		if (input.status == "tomorrow") {
			task.isDueToday = false;
			task.isDueTomorrow = true;
			task.isDueSomeOtherTime = false;
		}

		if (input.status == "not-today") {
			task.isDueToday = false;
			task.isDueTomorrow = false;
			task.isDueSomeOtherTime = true;
		}

		return task;
	}

	return {
		build: build,
		buildSeveral: buildSeveral
	};
};