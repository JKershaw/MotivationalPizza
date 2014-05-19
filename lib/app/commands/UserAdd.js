module.exports = function (clock, repositories) {

	function run(args, callback) {

		var user = args.user;

		user.registeredAt = clock.getTime();

		repositories.users.save(user, function () {
			callback(false);
		});

	}

	return {
		run: run
	};
};