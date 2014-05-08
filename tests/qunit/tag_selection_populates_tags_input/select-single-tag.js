test("When tag is selected, it appears in the tags input", function () {
	$("#task-tags").val("");
	$('.tag:first-child').click();
	equal($("#task-tags").val(), "Tag One");
});
