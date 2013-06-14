// Background view
var VideoBackgroundView = Backbone.View.extend({

	// Init
	initialize: function() {

		// The id of the video tag
		this.videoTagId = "video1";

		// Base dimensions of the video
        this.BASE_WIDTH = 854;
        this.BASE_HEIGHT = 480;

        // A reference to the video player
        this.player = null;


        _.bindAll(this, 'onVideoReady');

        // Set up video player, and wait for ready
        videojs(this.videoTagId).ready(this.onVideoReady);
    },

    // When player is ready. Create a reference to it
    onVideoReady: function() {
    	this.player = videojs(this.videoTagId);
    },

    // Play the video
    playVideo: function() {
    	if (this.player)
    		this.player.play();
    },

    // Pause the video
    pauseVideo: function() {
    	if (this.player)
    		this.player.pause();
    },

    // Resize this
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

		if (this.player) {
			this.player.dimensions(bgWidth, bgHeight);
		}
    }

});