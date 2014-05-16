var TaskQuery = require("../TaskQuery");

module.exports = function (request) {

	function build(callback) {

		var taskQuery = new TaskQuery(request);

		taskQuery.findById(request.params.id, function (task) {
			if (!task) {
				callback(false);
			}

			var tags = "";

			if (task.tags) {

				for (var i = 0; i < task.tags.length; i++) {

					if (i > 0) {
						tags = tags + ", ";
					}

					tags = tags + task.tags[i].text;
				}
			}

			model = {
				task: task,
				tags: tags
			};

			callback(model);
		});
	}

	return {
		build: build
	};
};