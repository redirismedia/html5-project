// Nav model
var NavModel = Backbone.Model.extend({
    defaults: {
        currentSection: ''
    }
});

// Nav view
var NavView = Backbone.View.extend({
    initialize: function() {
        _.bindAll(this, 'setSection', 'changeColor');

        this.homeButton = $("#homeButton");
        this.storyButton = $("#storyButton");
        this.videosButton = $("#videosButton");

        // Attach section attr
        this.homeButton.attr("section", "home");
        this.storyButton.attr("section", "story");
        this.videosButton.attr("section", "videos");
    },

    events: {
        'click .navButton':'setSection'
    },

    // Change the color of the nav
    changeColor: function(color) {
        this.color = color;
        this.render();
    },

    // Render the nav
    render: function() {
        console.log("NavView render");
        this.homeButton.css('border-color', this.color);
        this.storyButton.css('border-color', this.color);
        this.videosButton.css('border-color', this.color);
    },

    // Set the section for this view
    setSection: function(event) {
        var section = $(event.target).attr("section");
        this.model.set({ 'currentSection':section });
    }
});