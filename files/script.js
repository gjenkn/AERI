let videoId;

// create youtube player
    var player;
    function onYouTubePlayerAPIReady() {
        player = new YT.Player('player', {
          height: '100%',
          width: '100%',
          videoId: getQueryParam('videoId'),
          events: {
            'onStateChange': onPlayerStateChange
          }
        });
    }

    // when video ends
    function onPlayerStateChange(event) {    
        var loopSwitch = document.getElementById('loopSwitch');
    
        if(event.data === 0 && loopSwitch.checked) {    
            trimButton.click();
        }
    }

    function goToVideoPage() {
        const youtubeLink = document.getElementById('youtubeLink').value;
        videoId = youtubeLink.split('v=')[1];
        localStorage.setItem('videoId', videoId);
        const videoPageUrl = `video.html?videoId=${videoId}`;
        window.location.href = videoPageUrl;
    }

    function goToVideoPage2() {
        const videoId = localStorage.getItem('videoId');
        const videoPageUrl = `comparison.html?videoId=${videoId}`;
        window.location.href = videoPageUrl;
    }


function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function loadVideo(startSeconds, endSeconds) {
    const videoId = getQueryParam('videoId');
    const youtubeVideo = document.getElementById('youtubeVideo');
    youtubeVideo.src = `https://www.youtube.com/embed/${videoId}?start=${startSeconds}&end=${endSeconds}&autoplay=1`;
}

function getAndLoadVideo() {
    const startMinutesInput = document.getElementById('startMinutes').value.trim();
    const startSecondsInput = document.getElementById('startSeconds').value.trim();
    const endMinutesInput = document.getElementById('endMinutes').value.trim();
    const endSecondsInput = document.getElementById('endSeconds').value.trim();

    const startMinutes = startMinutesInput ? parseInt(startMinutesInput, 10) : 0;
    const startSeconds = startSecondsInput ? parseInt(startSecondsInput, 10) : 0;
    const endMinutes = endMinutesInput ? parseInt(endMinutesInput, 10) : 0;
    const endSeconds = endSecondsInput ? parseInt(endSecondsInput, 10) : 0;

    const a = startMinutes * 60 + startSeconds;
    const b = endMinutes * 60 + endSeconds;
    console.log(a + " " + b);

    player.loadVideoById({
        'videoId': getQueryParam('videoId'),
        'startSeconds': a,
        'endSeconds': b
    });

}

document.addEventListener('DOMContentLoaded', function() {
    var mirrorSwitch = document.getElementById('mirrorSwitch');
    window.addEventListener('load', function() {
        targetElement = document.getElementById('player');
    });

    mirrorSwitch.addEventListener('change', function() {
        if (mirrorSwitch.checked) {
            console.log("hi")
            targetElement.classList.add('mirror');
        } else {
            targetElement.classList.remove('mirror');
        }
    });
});

function toggleFullscreen() {
    var container = document.getElementById('player');
    var button = document.getElementById('fs');
    container.classList.toggle('fullscreen');
    button.classList.toggle('moveButton');
}
