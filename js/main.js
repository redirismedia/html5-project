(function() {

	// Constants
	var MIN_WINDOW_WIDTH = 1000;
	var MIN_WINDOW_HEIGHT = 760;


	// Variables
	var windowWidth;
	var windowHeight;

	var mainView;


	// Event Listeners
	$(document).ready(onDocumentReady);
	


	// Functions


	// When the document has finished loading. Init the site here.
	function onDocumentReady()
	{
		// Add classes to <html> for browser/versions
		var isIE = (navigator.userAgent.toLowerCase().indexOf("msie") > -1);
		if (isIE)
			$("html").addClass("ie");


		// Start app by creating MainView
		mainView = new MainView();

		// Resize init
		onWindowResize();
		$(window).resize(onWindowResize);
	}


	// When window is resized. Resize objects here.
	function onWindowResize()
	{
		resizeUpdate();

		mainView.resize(windowWidth, windowHeight);
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
