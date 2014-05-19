var TagCanBeAddedSpecification = require('../specifications/TagCanBeAddedSpecification');

module.exports = function (clock, repositories) {

	var tagCanBeAddedSpecification = new TagCanBeAddedSpecification();

	function run(args, callback) {

		var task = args.task, 
			tags = args.tags;

		for (var i = 0; i < tags.length; i++) {
			if (tagCanBeAddedSpecification.isSatisfiedBy(task, tags[i].text)) {
				task.tags.push(tags[i]);
			}
		}

		var query = repositories.tasks.buildQuery(task._id, task.user),
			updateRequest = {
				tags: task.tags
			};

		repositories.tasks.update(query, updateRequest, function () {
			callback(true);
		});

	}

	return {
		run: run
	};
};