let videoId;

// Create YouTube player using the YouTube API
var player;
function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
        height: '100%', 
        width: '100%', 
        videoId: getQueryParam('videoId'), // sets the video ID from the query parameter in the URL
        events: {
            'onStateChange': onPlayerStateChange // listen for changes in the player's state 
        }
    });
}

// ex. http://youtube.com/video.html?videoId=abc123 will return abc123 - retrieves the part after the ? in the link
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search); // key: v     value: the video ID - what we want
    return urlParams.get(param); 
}

// detect when the video ends and handle looping
function onPlayerStateChange(event) {    
    var loopSwitch = document.getElementById('loopSwitch'); 
    
    if (event.data === 0 && loopSwitch.checked) {
        trimButton.click();
    }
}

// navigate to the video page with the selected YouTube video
function goToVideoPage() {
    const youtubeLink = document.getElementById('youtubeLink').value; // Get the YouTube link input by the user
    videoId = youtubeLink.split('v=')[1]; // Extract the video ID from the YouTube URL
    localStorage.setItem('videoId', videoId); // Save the video ID in local storage for later use
    const videoPageUrl = `video.html?videoId=${videoId}`; 
    window.location.href = videoPageUrl; // Redirect to the video page
}

// navigate to the comparison page using the video ID stored in localStorage
function goToVideoPage2() {
    const videoId = localStorage.getItem('videoId'); // Retrieve the video ID from localStorage
    const videoPageUrl = `comparison.html?videoId=${videoId}`; // Create the URL for the comparison page
    window.location.href = videoPageUrl; // Redirect to the comparison page
}

function loadVideo(startSeconds, endSeconds) {
    const videoId = getQueryParam('videoId');
    const youtubeVideo = document.getElementById('youtubeVideo'); 
    youtubeVideo.src = `https://www.youtube.com/embed/${videoId}?start=${startSeconds}&end=${endSeconds}&autoplay=1`; 
}

// Get user-defined start and end times, then load the video in the player with those times
function getAndLoadVideo() {
    const startMinutesInput = document.getElementById('startMinutes').value.trim();
    const startSecondsInput = document.getElementById('startSeconds').value.trim();
    const endMinutesInput = document.getElementById('endMinutes').value.trim();
    const endSecondsInput = document.getElementById('endSeconds').value.trim();

    const startMinutes = startMinutesInput ? parseInt(startMinutesInput, 10) : 0;
    const startSeconds = startSecondsInput ? parseInt(startSecondsInput, 10) : 0;
    const endMinutes = endMinutesInput ? parseInt(endMinutesInput, 10) : 0;
    const endSeconds = endSecondsInput ? parseInt(endSecondsInput, 10) : 0;

    // total start and end times in seconds
    const a = startMinutes * 60 + startSeconds;
    const b = endMinutes * 60 + endSeconds;
    console.log(a + " " + b); // for debugging

    // Load the video with the specified start and end times
    player.loadVideoById({
        'videoId': getQueryParam('videoId'), 
        'startSeconds': a,
        'endSeconds': b 
    });
}

// Event listener for when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    var mirrorSwitch = document.getElementById('mirrorSwitch'); // Get the mirror switch checkbox element
    window.addEventListener('load', function() {
        targetElement = document.getElementById('player'); // Get the video player element
    });

    mirrorSwitch.addEventListener('change', function() {
        // If the mirror switch is checked, add a 'mirror' class to the player
        if (mirrorSwitch.checked) {
            targetElement.classList.add('mirror');
        } else {
            targetElement.classList.remove('mirror');
        }
    });
});

// Toggle fullscreen mode for the video player
function toggleFullscreen() {
    var container = document.getElementById('player'); 
    var button = document.getElementById('fs'); 
    container.classList.toggle('fullscreen'); 
    button.classList.toggle('moveButton'); 
}

// Event listener for video file uploads
document.getElementById('videoUpload').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Get the uploaded video file
    const videoPlayer = document.getElementById('videoPlayer'); // Get the video player element
    const videoSource = document.getElementById('videoSource'); // Get the video source element

    if (file) {
        const url = URL.createObjectURL(file); // Create a URL representing the uploaded file
        videoSource.src = url; // Set the source of the video element to the uploaded file
        videoPlayer.load();
    }
});