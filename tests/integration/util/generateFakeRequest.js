var crypto = require('crypto'),
	async = require('async'),
	UsersRepository = require('../../../lib/repositories/UsersRepository');

module.exports = function () {

	var usersRepository = new UsersRepository();

	var fakeUser = usersRepository.buildQuery(
		crypto.randomBytes(12).toString('hex')
	);

	var fakeRequest = {
			user: fakeUser
		};

	async.series([
		function () {
			usersRepository.save(fakeUser, function () {});
		}
	]);

	return fakeRequest;

};