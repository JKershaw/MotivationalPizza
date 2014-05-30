module.exports = function (dateString) {

	var parts = dateString.split('-');
	return new Date(parts[0], parts[1] - 1, parts[2]);

};