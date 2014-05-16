$('.tag-filter').on('click', function () {

	if ($(this).data('tag-clear')) {

		$(".task").show();

	} else {

		var tagValue = $(this).data('tag-value');

		$(".task").hide();
		$(".task[data-tags*='" + tagValue + "']").show();
	}

});