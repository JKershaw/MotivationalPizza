require('date-utils');

module.exports = function () {

	function calculate() {
		return Date.today().add({
			hours: 3
		}).getTime();
	}

	return {
		calculate: calculate
	};
};