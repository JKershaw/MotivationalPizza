module.exports = function (stringToSplit) {
	var componentArray = stringToSplit.split(',');
	componentStrings = [];

	for (var i = 0; i < componentArray.length; i++) {

		var componentText = componentArray[i].replace(/^\s+|\s+$/g, '');

		componentStrings.push({
			text: componentText
		});
	}

	return componentStrings;
};