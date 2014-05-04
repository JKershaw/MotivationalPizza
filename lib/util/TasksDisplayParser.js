HttpLinkParser = require("../util/HttpLinkParser");

module.exports = function () {
	
	function parse(tasks) {

		var httpLinkParser = new HttpLinkParser();

		for (var i = 0; i < tasks.length; i++) {
			tasks[i].text = httpLinkParser.parse(tasks[i].text);
		}

		return tasks;

	}

	return {
		parse: parse
	}
}