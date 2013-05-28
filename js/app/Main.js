// Main view
var MainView = Backbone.View.extend({

    el: $('#main'),

    initialize: function() {
        _.bindAll(this, 'render', 'onNavModelChange');

        console.log('MainView initialize');

        // Variables
        this.currentSection = 'home';

        // Views
        this.backgroundView = new BackgroundView({ el:'#background' });

        this.navModel = new NavModel();
        this.navView = new NavView({ model: this.navModel, el:'#nav' });

        this.sectionModel = new SectionModel();
        this.sectionView = new SectionView({ model:this.sectionModel, el:'#section' });

        this.audioModel = new AudioModel();
        this.audioButtonView = new AudioButtonView({ model:this.audioModel, el:'#audioButton' });

        // Event Listeners
        this.navModel.on('change', this.onNavModelChange);
    },

    // When the navModel is changed
    onNavModelChange: function() {
        this.currentSection = this.navModel.get('currentSection');
        this.render();
    },

    // Render the view
    render: function() {
        console.log('MainView render');

        var color;

        switch (this.currentSection) {
            case 'home':
                color = '#990000';
                break;
            case 'story':
                color = '#009900';
                break;
            case 'videos':
                color = '#000099';
                break;
            default:
                color = '#333333';
                break;
        }

        // Render nav
        this.navView.changeColor(color);

        // Render section
        this.sectionView.changeSection(this.currentSection);
    },

    // @param w, h: windowWidth and windowHeight
    resize: function(w, h) {
        this.backgroundView.resize(w, h);
    }

});

// Start app by creating MainView
//var mainView = new MainView();
