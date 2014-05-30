module.exports = function () {

	function build(input, callback) {

		task = input;

		if (task.status == "open") {
			task.isDueToday = true;
			task.isDueTomorrow = false;
			task.isDueSomeOtherTime = false;
		}

		if (task.status == "tomorrow") {
			task.isDueToday = false;
			task.isDueTomorrow = true;
			task.isDueSomeOtherTime = false;
		}

		if (task.status == "not-today") {
			task.isDueToday = false;
			task.isDueTomorrow = false;
			task.isDueSomeOtherTime = true;
		}

		callback(task);
	}

	return {
		build: build
	};
};