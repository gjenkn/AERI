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

    // Call loadVideo with the timestamps entered by the user
    loadVideo(a, b);
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
