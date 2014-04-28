var Query = require("../lib/Query");

module.exports = function (app) {

	app.get('/', function (request, response) {

		var query = new Query();

		query.allTasks(function (tasks) {

			model = {
				info: request.query.info || false,
				tasks: [{
					text: "Do the washing up"
				}]
			};
			
			response.render("home-page.ejs", model);
		});


	});
};