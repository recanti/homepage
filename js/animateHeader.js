window.onload = function() {
	
	if (TweenLite && TimelineLite) {

		var duration = 0.47;

		// set all the header words and the nav icons to 25% opacity
		var spans = document.querySelector(".splash__header").querySelectorAll("span");
		var nav = document.querySelector(".splash__nav");
		TweenLite.set(spans, {opacity:".25"});
		TweenLite.set(nav, {opacity:".25"});

		// animate the words and the icon set one by one
		var tl = new TimelineLite();
		for (var i = 0; i < spans.length; i++) {
			if (spans[i].classList.contains(".splash__header--orange") || 
				spans[i].classList.contains(".splash__header--green")) {
				tl.to(spans[i], duration, {opacity: 1.0, ease:Power4.easeOut});
			} else {
				tl.to(spans[i], duration, {opacity: 1.0});
			}
		}
		tl.to(nav, duration, {opacity: 1.0});
		tl.play();
	}
}
