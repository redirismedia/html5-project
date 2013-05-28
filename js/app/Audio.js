// Audio model
var AudioModel = Backbone.Model.extend({
    defaults: {
        isPlaying: false
    },

    // Toggle the audio
    toggle: function() {
    	var isPlaying = !this.get("isPlaying");

    	// Pause or play audioplayer
        this.set("isPlaying", isPlaying);
    	if (isPlaying)
    		audioplayer.play();
    	else
    		audioplayer.pause();
    }
});

// AudioButton view
var AudioButtonView = Backbone.View.extend({
    initialize: function() {
        _.bindAll(this, 'onModelChange', 'onClick');

        // Event Listeners
        this.model.bind('change:isPlaying', this.onModelChange);

        this.onModelChange();
    },

    events: {
        'click': 'onClick'
    },

    // When the model changes, toggle button on or off
    onModelChange: function() {
    	var isPlaying = this.model.get("isPlaying");

    	// Change button to "on" or "off"
    	if (isPlaying) {
    		this.$el.addClass("on");
			this.$el.removeClass("off");
    	} else {
    		this.$el.removeClass("on");
			this.$el.addClass("off");
    	}		
    },

    onClick: function() {
        this.model.toggle();
    }

});
