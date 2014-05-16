$('.tag-filter').on('click', function () {

	$(this).siblings().removeClass("btn-primary");
	$(this).siblings().addClass("btn-default");

	$(this).addClass("btn-primary");
	$(this).removeClass("btn-default");
	
	if ($(this).data('tag-clear')) {

		$(".task-not-today").show();

	} else {

		var tagValue = $(this).data('tag-value');

		$(".task-not-today").hide();
		$(".task-not-today[data-tags*='" + tagValue + "']").show();
	}

});