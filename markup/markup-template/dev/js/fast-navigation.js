//-------quick navigation for easy testing

//function to create a block with the output of links to specified pages
function fastNavigation(pages) {
	for (var i = 0; i < pages.length; i++) {
		$('<div class="widget_item"><a class="widget_link" href="' + pages[i] + '.html' + '">' + pages[i] + '</a></div>').appendTo('.widget_list');
	}
}
//-------fastNavigation init