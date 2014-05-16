var User = require("../authentication/User"),
	MpApp = require('../app/MpApp'),
	TaskObjectFactory = require('../objectFactories/TaskObjectFactory');

module.exports = function (tasksRepository, usersRepository) {

	var user = new User(usersRepository),
		mpApp = new MpApp(tasksRepository),
		taskObjectFactory = new TaskObjectFactory();

	function handle(smsBody, response, callback) {

		console.log("Text message recieved: ", smsBody);

		user.findByPhoneNumber(smsBody.From, function (actualUser) {

			if (!actualUser || actualUser.length === 0) {
				response.set('Content-Type', 'text/plain');
				response.send("Sorry, we didn't recognise your phone number. Check it's right on your profile.");
				return callback(false);
			}

			var userId = actualUser._id,
				newTask = {
					text: smsBody.Body,
					tagsString: "SMS"
				};

			taskObjectFactory.build(newTask, userId, function (task) {
				mpApp.command.add(task, function (success) {
					if (success) {
						response.set('Content-Type', 'text/plain');
						response.send("Your task has been added.");
						return callback(success);
					} else {
						task.status = "tomorrow";
						mpApp.command.add(task, function (success) {
							response.set('Content-Type', 'text/plain');
							response.send("This task has been added to Tomorrow's list.");
							return callback(success);
						});
					}
				});
			});

		});
	}

	return {
		handle: handle
	};
};