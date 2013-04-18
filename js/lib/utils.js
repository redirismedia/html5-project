// Misc Utils
var Utils = function() {

	// Open a URL
	this.getURL = function(url, target) {
		if (target == "_blank")
			window.open(url);
		else
			window.location = url; 

	}

	// Rotate an object with CSS
	this.rotate = function(objectId, value) {
		var rotationStr = 'rotate(' + value + 'deg)';

		$("#" + objectId).css({
		    'transform': rotationStr,
		    '-webkit-transform': rotationStr,
		    '-moz-transform': rotationStr,
		    '-o-transform': rotationStr,
		    '-ms-transform': rotationStr
		});	
	}

	// Perform a google analytics event track
	this.gaTrackEvent = function(category, action, label) {
		if (label == undefined) {
			_gaq.push(['_trackEvent', category , action]);
		} else {
			_gaq.push(['_trackEvent', category , action, label ]);
		}
	}

}

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());


/*

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

*/

