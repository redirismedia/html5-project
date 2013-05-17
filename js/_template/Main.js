// Main view
var MainView = Backbone.View.extend({

    el: $('#main'),

    initialize: function() {
        _.bindAll(this, 'render', 'onNavModelChange');


        // Variables
        this.currentSection = 'home';


        /*
        // Views
        this.navModel = new NavModel();
        this.navView = new NavView({ model: this.navModel, el:'#nav' });

        this.sectionModel = new SectionModel();
        this.sectionView = new SectionView({ model:this.sectionModel, el:'#section' });

        // Event Listeners
        this.navModel.on('change', this.onNavModelChange);
		*/

    },

    // When the navModel is changed
    /*
    onNavModelChange: function() {
        this.currentSection = this.navModel.get('currentSection');
        this.render();
    },
	*/

    // Render the view
    render: function() {
        
    }

});

// Start app by creating MainView
// var mainView = new MainView({ el:'#main' });