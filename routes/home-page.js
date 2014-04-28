module.exports = function (app) {

	app.get('/', function (request, response) {

		model = {
			info: request.query.info || false,
			tasks: [{
				text: "Do the washing up"
			}]
		}

		response.render("home-page.ejs", model);

	});
};