module.exports = function () {

	function build(infoBoxType) {

		var infoBox = false;

		switch (infoBoxType) {

		case "task-added":
			infoBox = {
				class: "alert-info",
				text: "Your new task has been added."
			};
			break;
		case "task-updated":
			infoBox = {
				class: "alert-info",
				text: "Your task has been updated."
			};
			break;
		case "task-deleted":
			infoBox = {
				class: "alert-warning",
				text: "Your task has been deleted."
			};
			break;
		case "task-done":
			infoBox = {
				class: "alert-success",
				text: "Your task has been done."
			};
			break;
		case "error-too-many-today":
			infoBox = {
				class: "alert-danger",
				text: "Nope, sorry. You already have enough things to do today."
			};
			break;
		case "signed-up":
			infoBox = {
				class: "alert-info",
				text: "Hi there, you've signed up."
			};
			break;
		}

		return infoBox;

	}

	return {
		build: build
	}
}