module.exports = function (commandName, clock, repositories) {
	return new require('../commands/' + commandName)(clock, repositories);
};