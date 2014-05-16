$('.tag-filter').on('click', function () {

	if ($(this).data('tag-clear')) {

		$(".task-not-today").show();

	} else {

		var tagValue = $(this).data('tag-value');

		$(".task-not-today").hide();
		$(".task-not-today[data-tags*='" + tagValue + "']").show();
	}

});