//--------scrollup plugins
function scrollUpDown() {
	var buttonUp = $('.scroll-up-plugins__button--25'),
		buttonDown = $('.scroll-up-plugins__button--75'),
		button50 = $('.scroll-up-plugins__button--50'),
		buttonBlock = $('.scroll-up-plugins'),
		body = document.body,
		html = document.documentElement,
		heightWindow = window.innerHeight,
		height100 = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight),
		height25 = height100 * 0.25 - heightWindow/2;
		height50 = height100 * 0.5 - heightWindow/2;
		height75 = height100 * 0.75 - heightWindow/2;

	function buttonClick() {
		buttonUp.on("click", function() {
			window.scrollTo(0, height25);
			return false;
		});
		button50.on("click", function() {
			window.scrollTo(0, height50);
			return false;
		});
		buttonDown.on("click", function() {
			window.scrollTo(0, height75);
			return false;
		});
	}
	buttonClick();

	function buttonHide() {
		buttonBlock.hide();
		if (height100 > 5000) {
			buttonBlock.show();
		}
	}
	buttonHide();
}