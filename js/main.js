(function() {

	// Constants
	var MIN_WINDOW_WIDTH = 1200;
	var MIN_WINDOW_HEIGHT = 900;


	// Variables
	var windowWidth;
	var windowHeight;


	// Event Listeners
	$(document).ready(onDocumentReady);
	$(window).resize(onWindowResize);



	// Functions


	// When the document has finished loading. Init the site here.
	function onDocumentReady()
	{
		// Add classes to <html> for browser/versions
		var isIE = (navigator.userAgent.toLowerCase().indexOf("msie") > -1);
		if (isIE)
			$("html").addClass("ie");


	}



	// When window is resized. Resize objects here.
	function onWindowResize()
	{

	}
	
	// Update resize information
	function resizeUpdate()
	{
		windowWidth = $(window).innerWidth();
		windowHeight = $(window).innerHeight();
		
		// Apply minimums
		if (windowWidth < MIN_WINDOW_WIDTH) windowWidth = MIN_WINDOW_WIDTH;
		if (windowHeight < MIN_WINDOW_HEIGHT) windowHeight = MIN_WINDOW_HEIGHT;
	}


})();
