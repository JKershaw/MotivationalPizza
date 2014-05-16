test("When tag filter is selected, unselected tags get hidden", function () {
	
	$('.tag-filter[data-tag-value="test"]').click();

	equal($(".task[data-task-id='5374e29ed198d60200b9a7fb']").css('display'), "block");
	equal($(".task[data-task-id='53749a967ed5e002009c3386']").css('display'), "none");

});

test("When tag filter is selected then clear selected, all tags get shown", function () {
	
	$('.tag-filter[data-tag-value="test"]').click();
	$('.tag-filter[data-tag-clear="true"]').click();

	equal($(".task[data-task-id='5374e29ed198d60200b9a7fb']").css('display'), "block");
	equal($(".task[data-task-id='53749a967ed5e002009c3386']").css('display'), "block");

});
