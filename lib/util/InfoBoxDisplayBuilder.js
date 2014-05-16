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
		case "tasks-updated":
			infoBox = {
				class: "alert-info",
				text: "Today's tasks have been updated."
			};
			break;
		case "task-split":
			infoBox = {
				class: "alert-info",
				text: "Your task has been split."
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
		case "logged-out":
			infoBox = {
				class: "alert-info",
				text: "Bye! You've now logged out."
			};
			break;
		case "logged-in":
			infoBox = {
				class: "alert-info",
				text: "Welcome back, you've logged in!"
			};
			break;
		case "profile-updated":
			infoBox = {
				class: "alert-info",
				text: "Your details have been updated."
			};
			break;
		}

		return infoBox;

	}

	return {
		build: build
	};
};