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


