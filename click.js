document.addEventListener('DOMContentLoaded', function() {
    let audioContext;

    // Function to initialize AudioContext
    function initializeAudioContext() {
        if (!audioContext) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContext = new AudioContext();
        }
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
    }

    // Resume audio context on user interaction
    document.body.addEventListener('click', initializeAudioContext);

    let recording = false;
    let recordedEvents = [];
    let recordingStartTime = 0;

    const sequencerData = Array(8).fill().map(() => Array(16).fill(false));
    let selectedChannel = 0;

    function startRecording() {
        recording = true;
        recordedEvents = [];
        recordingStartTime = Date.now();
    }

    function stopRecording() {
        recording = false;
    }

    function playRecording() {
        recordedEvents.forEach(event => {
            setTimeout(() => {
                playSample(event.channel);
            }, event.time);
        });
    }

    function recordEvent(channel) {
        if (recording) {
            recordedEvents.push({ channel, time: Date.now() - recordingStartTime });
        }
    }

    document.getElementById('rec').addEventListener('click', function() {
        startRecording();
    });

    document.getElementById('stop').addEventListener('click', function() {
        stopRecording();
    });

    document.getElementById('play').addEventListener('click', function() {
        playRecording();
    });

    function playSample(channel) {
        const audioElement = document.getElementById(`sample${channel + 1}`);
        if (audioElement) {
            audioElement.currentTime = 0;
            audioElement.play().catch(error => {
                console.error(`Error playing sample ${channel + 1}:`, error);
            });
        }
    }

    const pads = document.querySelectorAll('.pads button');
    pads.forEach((pad, index) => {
        pad.addEventListener('click', function() {
            recordEvent(index);
            const audioElement = document.getElementById(`sample${index + 1}`);
            if (audioElement) {
                audioElement.currentTime = 0;
                audioElement.play().catch(error => {
                    console.error(`Error playing sample ${index + 1}:`, error);
                });
            }
            pad.onmouseleave = function() {
                if (document.selection) {
                    document.selection.empty();
                } else {
                    window.getSelection().removeAllRanges();
                }
            };
        });
    });

    const channels = document.querySelectorAll('.channel');
    channels.forEach((channel, index) => {
        channel.addEventListener('click', function() {
            selectedChannel = index;
            updateSequencerGrid();
        });
    });

    function updateSequencerGrid() {
        const steps = document.querySelectorAll('.sequencer-step');
        steps.forEach((step, index) => {
            step.classList.toggle('active', sequencerData[selectedChannel][index]);
        });
    }
});
