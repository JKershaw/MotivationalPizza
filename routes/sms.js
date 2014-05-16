var SmsHandler = require("../lib/util/SmsHandler"),
	TasksRepository = require('../lib/repositories/TasksRepository'),
	UsersRepository = require('../lib/repositories/UsersRepository');

module.exports = function (app) {

	var tasksRepository = new TasksRepository(),
		usersRepository = new UsersRepository(),
		smsHandler = new SmsHandler(tasksRepository, usersRepository);

	app.all('/SMS', function (request, response) {
		smsHandler.handle(request.body, response, function(){
			
		});
	});
};