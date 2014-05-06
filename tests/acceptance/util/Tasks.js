var async = require("async");

module.exports = function () {
	function add(tasks, browser, done) {

		browser.visit('/', function () {

			async.eachSeries(tasks, function (task, done) {
				browser.clickLink('Add New Task', function () {
					browser.fill("#task-text", task.text);
					browser.pressButton("Add Task", done);
				});
			}, done);

		});
	}

	return {
		add: add
	};
};