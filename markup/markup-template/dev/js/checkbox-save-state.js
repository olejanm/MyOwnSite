function checkboxSave() {
	function save() {
		var checkbox = document.getElementById('button-all-off');
		localStorage.setItem('button-all-off', checkbox.checked);
	}

	function click() {}
	jQuery('#button-all-off').on('click', function() {
		save();
	});
	click();

	function load() {
		var checked = JSON.parse(localStorage.getItem('button-all-off'));
		document.getElementById("button-all-off").checked = checked;
	}
	load();
}