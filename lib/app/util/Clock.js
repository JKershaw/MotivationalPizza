module.exports = function Clock() {

	function getTime() {
		return new Date().getTime();
	}

	return {
		getTime: getTime
	};
};