var User = require("../authentication/User"),
	MpApp = require('../app/MpApp'),
	TaskObjectFactory = require('../objectFactories/TaskObjectFactory');

module.exports = function (tasksRepository) {

	var user = new User(),
		mpApp = new MpApp(tasksRepository),
		taskObjectFactory = new TaskObjectFactory();

	function handle(smsBody, response) {

		console.log("Text message recieved: ", smsBody);

		user.findByPhoneNumber(smsBody.From, function (actualUser) {

			if (!actualUser) {
				response.set('Content-Type', 'text/plain');
				return response.send("Sorry, we didn't recognise your phone number.");
			}

			var userId = actualUser._id,
				newTask = {
					text: smsBody.Body,
					tagsString: "SMS"
				};

			taskObjectFactory.build(newTask, userId, function (task) {
				mpApp.command.add(task, function (success) {
					response.send(200);
				});
			});

		});
	}

	return {
		handle: handle
	};
};