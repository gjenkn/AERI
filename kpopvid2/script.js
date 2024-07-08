// Load the video when the video.html page is loaded
if (window.location.pathname.endsWith('video.html')) {
    window.onload = loadVideo;
}

function goToVideoPage() {
    const youtubeLink = document.getElementById('youtubeLink').value;
    const videoId = youtubeLink.split('v=')[1];
    const videoPageUrl = `video.html?videoId=${videoId}`;
    window.location.href = videoPageUrl;
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function loadVideo() {
    const videoId = getQueryParam('videoId');
    if (videoId) {
        const youtubeVideo = document.getElementById('youtubeVideo');
        youtubeVideo.src = `https://www.youtube.com/embed/${videoId}`;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var switchInput = document.getElementById('switchInput');
    const targetElement = document.getElementById('youtubeVideo');

    switchInput.addEventListener('change', function() {
        if (switchInput.checked) {
            targetElement.classList.add('mirror');
        } else {
            targetElement.classList.remove('mirror');
        }
    });
});

function toggleFullscreen() {
    var container = document.getElementById('youtubeVideo');
    var button = document.getElementById('fs');
    container.classList.toggle('fullscreen');
    button.classList.toggle('moveButton');
}
