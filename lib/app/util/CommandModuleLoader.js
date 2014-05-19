module.exports = function (clock, repositories) {

	function load(commandName) {
		var CommandModule = require('../commands/' + commandName);
		return new CommandModule(clock, repositories);
	}

	return {
		load: load
	};
};