module.exports = function () {

	function isSatisfiedBy(task, tagText) {

		if (!tagText || tagText.length < 1) {
			return false;
		}

		var tags = task.tags;

		for (var i = 0; i < tags.length; i++) {
			if (tags[i].text == tagText) {
				return false;
			}
		}

		return true;
	}

	return {
		isSatisfiedBy: isSatisfiedBy
	}
}