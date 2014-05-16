var SmsHandler = require("../lib/util/SmsHandler"),
	TasksRepository = require('../lib/repositories/TasksRepository');

module.exports = function (app) {

	var tasksRepository = new TasksRepository(),
		smsHandler = new SmsHandler(tasksRepository);

	app.all('/SMS', function (request, response) {
		smsHandler.handle(request.body, response);
	});
};