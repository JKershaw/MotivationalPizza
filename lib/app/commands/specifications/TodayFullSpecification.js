module.exports = function(tasksRepository){
	
	function isSatisfiedBy(userId, callback){

		var query = {
			status: "open",
			user: userId
		};

		tasksRepository.find(query, function(todayTasks){
			callback(todayTasks.length >= 5);
		});
	}

	return {
		isSatisfiedBy: isSatisfiedBy
	}
}