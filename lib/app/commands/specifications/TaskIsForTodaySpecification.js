module.exports = function(){
	
	function isSatisfiedBy(task, callback){

		callback(task.status == "open");
	}

	return {
		isSatisfiedBy: isSatisfiedBy
	};
};