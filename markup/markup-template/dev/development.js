// To connect js scripts used plugin rigger included
// connection occurs through the design //= folder-name/file-name.js

//variable with an array of page names
var fastNavigationPage = ["01-home", "dev_wp-test-page"];

jQuery(document).ready(function() {
	checkboxSave();
	scrollUpDown();
	breakpointRespChecked();
	breakpointWidth();
	windowResize(breakpointWidth);
	fastNavigation(fastNavigationPage);
	buttonAllOff();
});


//-------- -------- -------- --------
//-------- included dev js function start
//-------- -------- -------- --------

//#####function to trigger another function when resizing the browser window
//= ./js/window-resize-function.js
//function call --- windowResize(functName);

//#####quick navigation for easy testing
//= ./js/fast-navigation.js
//function call --- fastNavigation(fastNavigationPage);

//#####scrollup plugins
//= ./js/scroll-up-down.js
//module scrollUpDown ----INIT
//function call --- scrollUpDown();

//#####breakpoint responsive utilite
//= ./js/breakpoint-responsive.js
//function call --- breakpointRespChecked();

//#####breakpoint width
//= ./js/breakpoint-width.js
//function call --- breakpointWidth();

//#####button-all-off
//= ./js/button-all-off.js
//function call --- buttonAllOff();


//#####checkbox-save-state
//= ./js/checkbox-save-state.js
//function call --- ;

//-------- -------- -------- --------
//-------- included dev js function end
//-------- -------- -------- --------