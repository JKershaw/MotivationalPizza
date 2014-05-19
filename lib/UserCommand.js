var bcrypt = require('bcrypt-nodejs'),
	UserObjectFactory = require("./objectFactories/UserObjectFactory"),
	TasksRepository = require('./repositories/TasksRepository'),
	UsersRepository = require('./repositories/UsersRepository'),
	MpApp = require('./app/MpApp');

module.exports = function (usersRepository) {

	var tasksRepository = new TasksRepository(),
		mpApp = new MpApp(tasksRepository, usersRepository);

	function validPassword(realPassword, enteredPassword) {
		return bcrypt.compareSync(realPassword, enteredPassword);
	}

	function save(username, password, callback) {

		var userObjectFactory = new UserObjectFactory();

		userObjectFactory.build(username, password, function (user) {
			mpApp.command.saveUser(user, callback);
		});
	}

	function updatePhoneNumber(userAccount, phoneNumber, callback) {

		var query = usersRepository.buildQuery(userAccount._id),
			updateRequest = {
				phoneNumber: phoneNumber
			};

		usersRepository.update(query, updateRequest, function () {
			callback();
		});
	}

	function updateMaxTodayTaskCount(userAccount, maxTodayTaskCount, callback) {

		maxTodayTaskCount = parseInt(maxTodayTaskCount, 10);

		var query = usersRepository.buildQuery(userAccount._id),
			updateRequest = {
				maxTodayTaskCount: maxTodayTaskCount
			};

		usersRepository.update(query, updateRequest, function () {
			callback();
		});
	}

	return {
		validPassword: validPassword,
		save: save,
		updatePhoneNumber: updatePhoneNumber,
		updateMaxTodayTaskCount: updateMaxTodayTaskCount
	};
};