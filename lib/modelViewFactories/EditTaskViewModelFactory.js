var TaskQuery = require("../TaskQuery");

module.exports = function (request) {

	function build(callback) {

		var taskQuery = new TaskQuery(request);

		taskQuery.findById(request.params.id, callback, function (task) {
			taskQuery.popularTags(10, function (commonTags) {

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
					tags: tags,
					commonTags: commonTags
				};

				callback(model);
			});
		});
	}

	return {
		build: build
	};
};