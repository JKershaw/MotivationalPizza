module.exports = function (clock, repositories) {

	function run(args, callback) {

		var userAccount = args.user,
			phoneNumber = args.phoneNumber;

		var query = repositories.users.buildQuery(userAccount._id),
			updateRequest = {
				phoneNumber: phoneNumber
			};

		repositories.users.update(query, updateRequest, function () {
			callback();
		});

	}

	return {
		run: run
	};
};