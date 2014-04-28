module.exports = function (app) {
	app.get('/', function (request, response) {
		model = {
			info: request.query.info || false
		}
		response.render("home-page.ejs", model);
	});
};