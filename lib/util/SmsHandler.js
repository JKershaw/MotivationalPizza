var UserQuery = require("../UserQuery"),
	MpAppBuilder = require('../util/MpAppBuilder');
TaskObjectFactory = require('../objectFactories/TaskObjectFactory');

module.exports = function (tasksRepository, usersRepository) {

	var userQuery = new UserQuery(usersRepository),
		mpApp = new MpAppBuilder().build(tasksRepository, usersRepository),
		taskObjectFactory = new TaskObjectFactory();

	function handle(smsBody, response, callback) {

		console.log("Text message recieved: ", smsBody);

		userQuery.findByPhoneNumber(smsBody.From, function (actualUser) {
			userQuery.findByUsPhoneNumber(smsBody.From, function (actualUsUser) {

				if ((!actualUser || actualUser.length === 0) && actualUsUser){
					actualUser = actualUsUser;
				}

				if (!actualUser || actualUser.length === 0) {
					response.set('Content-Type', 'text/plain');
					response.send("Sorry, we didn't recognise your phone number. Check it's right on your profile.");
					return callback(false);
				}

				var userId = actualUser._id,
					newTask = {
						'task-text': smsBody.Body,
						'task-tags': "SMS"
					};

				taskObjectFactory.build(newTask, userId, function (task) {
					mpApp.command("TaskAdd", {
						task: task
					}, function (success) {
						if (success) {
							response.set('Content-Type', 'text/plain');
							response.send("Your task has been added.");
							return callback(success);
						} else {
							task.status = "tomorrow";
							mpApp.command("TaskAdd", {
								task: task
							}, function (success) {
								response.set('Content-Type', 'text/plain');
								response.send("This task has been added to Tomorrow's list.");
								return callback(success);
							});
						}
					});
				});
			});

		});
	}

	return {
		handle: handle
	};
};