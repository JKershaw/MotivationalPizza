module.exports = function (tasksRepository) {

	function add(task, callback) {
		tasksRepository.save(task, function () {
			callback(true);
		});
	}

	return {
		add: add
	}
}