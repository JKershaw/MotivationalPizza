var TaskQuery = require("../TaskQuery");

module.exports = function (request) {

	function build(callback) {

		var taskQuery = new TaskQuery(request);

		taskQuery.findById(request.params.id, function (task) {
			if (!task) {
				callback(false);
			}

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
				taskQuery.isTodayFull(function (todayIsfull) {

					model = {
						task: task,
						tags: tags,
						commonTags: commonTags,
						todayIsfull: todayIsfull
					};

					callback(model);
				});
			});
		});
	}

	return {
		build: build
	};
};