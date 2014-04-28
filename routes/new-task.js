module.exports = function (app) {
	
	app.get('/NewTask', function (request, response) {
		response.render("new-task.ejs");
	});

	app.post('/NewTask', function (request, response) {
		response.redirect("/?info=task-saved");
	});
};