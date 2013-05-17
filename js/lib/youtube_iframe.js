// A class to hold the youtube player
function YoutubePlayer() {

    // Constants
    this.tagId = "youtubePlayer";  // the DOM id of the tag the iframe will replace

    this.playerWidth = 480;
    this.playerHeight = 270;

    // Variables
    this.player = null;

    this.videoId = "";

    this.isEnded = false;   // If the youtube player is ended

    // Loads a video by youtube id
    this.loadVideoById = function(_videoId) 
    {
        this.videoId = _videoId;

        if (this.player) {
            this.player.loadVideoById(this.videoId);
        } else {
            // Create new youtube player
            var _this = this;

            this.player = new YT.Player(this.tagId, {
                width: this.playerWidth,
                height: this.playerHeight,
                videoId: this.videoId,
                playerVars: {rel: 0},
                events: {
                    'onReady': function() { _this.onPlayerReady(_this) },
                    'onStateChange': function(event) { _this.onPlayerStateChange(_this, event) }
                }
            });    
        }
    }

    // When the player is ready
    this.onPlayerReady = function(_this)
    {
        _this.player.playVideo();
    }

    // Do stuff when player state changes
    this.onPlayerStateChange = function(_this, event)
    {
        switch (event.data) {
            case 0:
                $("#"+_this.tagId).trigger({
                    type:'YoutubePlayerEnded'
                });
                this.isEnded = true;
                break;
            default:
                this.isEnded = false;
                break;
        }
    }

    // Set the size of the player (dimensions)
    this.setSize = function(_playerWidth, _playerHeight)
    {
        if (!this.player)
            return;
        this.playerWidth = _playerWidth;
        this.playerHeight = _playerHeight;

        this.player.setSize(_playerWidth, _playerHeight);
    }

    // Play video
    this.playVideo = function() 
    {
        if (!this.player)
            return;
        this.player.playVideo();
    }

    // Pause the video
    this.pauseVideo = function() 
    {
        if (!this.player)
            return;
        this.player.pauseVideo();
    }

    // Stops the video
    this.stopVideo = function()
    {
        if (!this.player)
            return;
        this.player.stopVideo();
    }

    // Destroys a youtube player, if any
    this.destroy = function() 
    {
        this.isEnded = true;

        if (!this.player)
            return;

        //console.log("destroy player");
        this.player.destroy();
        this.player = null;
    }

}

/*

// This code loads the Youtube Iframe API asynchronously
var isYoutubePlayerReady = false;

// Load the Youtube IFrame Player API aynchronously
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// The API calls this function when the player's state changes.
// The function indicates that when playing a video (state=1),
//  the player should play for six seconds and then stop.
function onYouTubeIframeAPIReady() {
    isYoutubePlayerReady = true;
}
*/