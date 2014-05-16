var User = require("../lib/authentication/User"),
	MpApp = require('../lib/app/MpApp'),
	TaskObjectFactory = require('../lib/objectFactories/TaskObjectFactory'),
	TasksRepository = require('../lib/repositories/TasksRepository');

module.exports = function (app) {

	var user = new User(),
		tasksRepository = new TasksRepository(),
		mpApp = new MpApp(tasksRepository),
		taskObjectFactory = new TaskObjectFactory();

	app.all('/SMS', function (request, response) {

		user.findByPhoneNumber(request.body.From, function (actualUser) {

			console.log("Text message recieved: ", request.body);
			console.log("User: ", actualUser);

			if (!actualUser) {
				return response.send("Sorry, we didn't recognise your phone number.");
			}

			var userId = actualUser._id,
				newTask = {
					text: request.body.Body,
					tagsString: "SMS"
				};

			taskObjectFactory.build(newTask, userId, function (task) {
				mpApp.command.add(task, function (success) {
					response.send(200);
				});
			});

		});
	});
};