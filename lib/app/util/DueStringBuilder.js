require('date-utils');

module.exports = function DueStringBuilder() {

	function build(date) {

		var daysRemaining = date.getDaysBetween(Date.today()) * -1;

		if (daysRemaining >= 7) {
			return "Due in " + daysRemaining + " days (" + date.toFormat("MMMM, D") + ")";
		}

		if (daysRemaining >= 2) {
			return "Due in " + daysRemaining + " days (" + date.toFormat("DDDD") + ")";
		}

		if (daysRemaining == 1) {
			return "Due tomorrow (" + date.toFormat("DDDD") + ")";
		}

		if (!daysRemaining) {
			return "Due today!";
		}

		if (daysRemaining == -1) {
			return "<span style='color: red'>Due Yesterday!</span>";
		}

		if (daysRemaining <= -3) {
			return "<span style='color: red'>Due " + (daysRemaining * -1) + " days ago!</span>";
		}

	}

	return {
		build: build
	};
};