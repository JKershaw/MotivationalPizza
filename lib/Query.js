module.exports = function () {

	function allTasks(callback) {
		var tasks = [{
			text: "Do the washing up"
		}];

		callback(tasks);
	}

	return {
		allTasks: allTasks
	};

};