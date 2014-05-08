$('.tag').on('click', function () {
	var tagText = $(this).text();
	var tagsTextValue = $("#task-tags").val();

	if (tagsTextValue.length > 0){
		tagsTextValue = tagsTextValue + ", ";
	}

	tagsTextValue = tagsTextValue + tagText;

	$("#task-tags").val(tagsTextValue);
});