module.exports = function (clock, repositories) {

	function run(args, callback) {

		var userAccount = args.user,
			usPhoneNumber = args.usPhoneNumber;

		var query = repositories.users.buildQuery(userAccount._id),
			updateRequest = {
				usPhoneNumber: usPhoneNumber
			};

		repositories.users.update(query, updateRequest, function () {
			callback();
		});

	}

	return {
		run: run
	};
};