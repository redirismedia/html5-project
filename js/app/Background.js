// Background view
var BackgroundView = Backbone.View.extend({
	initialize: function() {

		// Base dimensions of the image
        this.BASE_WIDTH = 860;
        this.BASE_HEIGHT = 480;
    },

    // Resize
    resize: function(windowWidth, windowHeight) {
        // Resize background
		var bgWidth, bgHeight;
		var bgRatio = this.BASE_WIDTH/this.BASE_HEIGHT;
		var windowRatio = windowWidth/windowHeight;
	
		// Calculate resizing for background
		if (bgRatio > windowRatio) {
			bgWidth = windowHeight*bgRatio;
			bgHeight = windowHeight;
		} else {
			bgWidth = windowWidth;
			bgHeight = windowWidth/bgRatio;
		}

		this.$el.width(bgWidth);
		this.$el.height(bgHeight);
    }

});