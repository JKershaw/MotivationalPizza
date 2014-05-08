test("When two tags are selected, thjey appear in the tag text field", function () {
	$("#task-tags").val("");
	$('.tag:nth-child(1)').click();
	$('.tag:nth-child(2)').click();
	equal($("#task-tags").val(), "Tag One, Cats");
});