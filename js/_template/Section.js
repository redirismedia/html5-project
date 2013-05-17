// Section model
var SectionModel = Backbone.Model.extend({
    defaults: {
        currentSection: ''
    }
});

// Section view
var SectionView = Backbone.View.extend({
    initialize: function() {
        this.currentSection = '';
    },

    changeSection: function(section) {
        this.currentSection = section;
        this.render();
    },

    render: function() {
        console.log("SectionView render");
        this.$el.html('Section: ' + this.currentSection);
    }
});