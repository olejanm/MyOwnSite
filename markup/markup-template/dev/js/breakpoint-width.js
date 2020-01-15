//#breakpoint width
function breakpointWidth() {
	//--------variable
	var breakpointWidthStrictly = $(".responsive-breakpoint__strictly"),
		windowInnerWidth = window.innerWidth,
		pixelRatio = window.devicePixelRatio,
		breakpointWidthPixelRatio = $(".responsive-breakpoint__pixel-ratio");
		//--------function
		breakpointWidthPixelRatio.html(pixelRatio);
		breakpointWidthStrictly.html(windowInnerWidth);
}