//-------enable disable all plugins for development

function buttonAllOff() {
	//--------variable
	var checkbox = $("#button-all-off");
	var devScriptsBlock = $(".dev-scripts-block");
	var checkboxState = checkbox.is(':checked');
	if (checkboxState == true) {
			devScriptsBlock.show()
		} else if (checkboxState == false) {
			devScriptsBlock.hide();
	}
	//--------function
	checkbox.on("click", function() {
		var checkboxState = checkbox.is(':checked');
		if (checkboxState == true) {
			devScriptsBlock.show()
		} else if (checkboxState == false) {
			devScriptsBlock.hide();
		}
	});
}