module.exports = function () {
	
	function parse(text, callback) {

		var exp = /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

		return text.replace(exp, "<a href=\"$1\" target=\"_blank\" rel=\"nofollow\">$1</a>");

	}

	return {
		parse: parse
	};
};