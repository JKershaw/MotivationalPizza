module.exports = function (app) {

	app.all('/SMS', function (request, response) {
		console.log("Body: ", request.body);
		response.send(200);
	});

	var fake_request_body = {
		ToCountry: 'GB',
		ToState: 'Colchester',
		SmsMessageSid: 'SM48996417d2cc3a63a6d4f715fdbe36b3',
		NumMedia: '0',
		ToCity: '',
		FromZip: '',
		SmsSid: 'SM48996417d2cc3a63a6d4f715fdbe36b3',
		FromState: '',
		SmsStatus: 'received',
		FromCity: '',
		Body: 'Again!',
		FromCountry: 'GB',
		To: '+441206704037',
		ToZip: '',
		MessageSid: 'SM48996417d2cc3a63a6d4f715fdbe36b3',
		AccountSid: 'AC3334c6a5fc4fb198c9d5cb96fe9fb9b5',
		From: '+447976048640',
		ApiVersion: '2010-04-01'
	};
};