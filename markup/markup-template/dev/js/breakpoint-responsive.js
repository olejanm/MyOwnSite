//#breakpoint Resp Checked
function breakpointRespChecked() {
	//--------variable
	var checkbox = $(".responsive-breakpoint-checkbox__checkbox"),
		checkboxAddClass = $(".responsive-breakpoint");
	//--------function
	checkbox.on("click", function() {
		var checkboxState = checkbox.is(':checked');
		if (checkboxState == true) {
			checkboxAddClass.addClass('js-checkbox--checked');
		} else if (checkboxState == false) {
			checkboxAddClass.removeClass('js-checkbox--checked');
		}
	});
}