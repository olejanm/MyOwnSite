//function to trigger another function when resizing the browser window
//use windowResize(functName);
function windowResize(functName) {
	//--------function
	$(window).on('resize orientationchange' , functName);
}