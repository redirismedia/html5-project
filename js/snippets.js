// Translates touch events to equivalent mouse events
$.fn.addTouch = function() {
	this.each(function(i,el){
		$(el).bind('touchstart touchmove touchend touchcancel',function() {
		    // we pass the original event object because the jQuery event
			// object is normalized to w3c specs and does not provide the TouchList
			handleTouch(event);
		});
	});
 
	var handleTouch = function(event) 
	{
		var touches = event.changedTouches,
		first = touches[0],
	 	type = '';

 		switch(event.type)
		{
			case 'touchstart':
				type = 'mousedown';
				break;
			case 'touchmove':
				type = 'mousemove';
				event.preventDefault();
				break;
	 
			case 'touchend':
			 	type = 'mouseup';
			 	break;
	 
			 default:
		 		return;
	    }
	
		var simulatedEvent = document.createEvent('MouseEvent');
		simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0/*left*/, null);
 		first.target.dispatchEvent(simulatedEvent);
	};
}



// Standard FB JS include
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// When FB (Facebook) is loaded and ready
window.fbAsyncInit = function() {
	
	// See https://developers.google.com/analytics/devguides/collection/gajs/gaTrackingSocial for details
	// Facebook 'like' event
	FB.Event.subscribe('edge.create', function(targetUrl) {
		_gaq.push(['_trackSocial', 'facebook', 'like']);
	});
	
	// Facebook 'unlike' event
	FB.Event.subscribe('edge.remove', function(targetUrl) {
		_gaq.push(['_trackSocial', 'facebook', 'unlike']);
	});
}

// Animation function
window.requestAnimFrame = (function(callback) {
	return	window.requestAnimationFrame || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame || 
			window.oRequestAnimationFrame || 
			window.msRequestAnimationFrame ||
			function(callback) {
				window.setTimeout(callback, 16.66);
			};
})();

// Usage with animate function
// window.requestAnimFrame(animate);
