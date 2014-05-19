module.exports = function (clock, repositories) {

	function run(args, callback) {

		var userAccount = args.user,
			maxTodayTaskCount = args.maxTodayTaskCount;

		maxTodayTaskCount = parseInt(maxTodayTaskCount, 10);

		var query = repositories.users.buildQuery(userAccount._id),
			updateRequest = {
				maxTodayTaskCount: maxTodayTaskCount
			};

		repositories.users.update(query, updateRequest, function () {
			callback();
		});

	}

	return {
		run: run
	};
};