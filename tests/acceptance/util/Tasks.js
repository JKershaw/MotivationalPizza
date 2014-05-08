var async = require("async");

module.exports = function () {
	function add(tasks, browser, done) {

		browser.visit('/', function () {

			async.eachSeries(tasks, function (task, done) {
				browser.clickLink('Add New Task', function () {
					browser.fill("#task-text", task.text);
					if (task.tag) {
						browser.fill("#task-tags", task.tag);
					}
					browser.pressButton("Add Task", done);
				});
			}, done);

		});
	}

	return {
		add: add
	};
};