document.addEventListener('DOMContentLoaded', function() {
    const sequencerGrid = document.querySelector('.sequencer-grid');
    const playButton = document.getElementById('play');
    const stopButton = document.getElementById('stop');
    const recordButton = document.getElementById('rec');
    const bpmRange = document.getElementById('bpm-range');
    const bpmDisplay = document.getElementById('bpm-display');
    const channelSections = document.querySelectorAll('.channel');
    const steps = 16; // Number of steps in the sequencer
    let tempo = 120; // BPM
    let interval = (60 / tempo) / 4 * 1000; // Interval between steps
    window.currentStep = 0; // Define currentStep globally
    let sequencerInterval;
    const sequencerData = Array(8).fill().map(() => Array(steps).fill(false));
    const slideValues = Array(8).fill(0); // Slide values for each channel
    const delayValues = Array(8).fill(0); // Delay values for each channel
    const reverbValues = Array(8).fill(0); // Reverb values for each channel
    let recording = false;
    let recordedEvents = [];
    let recordingStartTime = 0;
    let selectedChannel = 0;

    // Initialize the sequencer grid
    for (let i = 0; i < steps; i++) {
        const step = document.createElement('div');
        step.classList.add('sequencer-step');
        step.dataset.step = i;
        step.addEventListener('click', function() {
            this.classList.toggle('active');
            sequencerData[selectedChannel][i] = !sequencerData[selectedChannel][i];
        });
        sequencerGrid.appendChild(step);
    }

    function playStep() {
        const previousStep = (currentStep === 0) ? steps - 1 : currentStep - 1;
        const currentSteps = document.querySelectorAll(`.sequencer-step[data-step="${currentStep}"]`);
        const previousSteps = document.querySelectorAll(`.sequencer-step[data-step="${previousStep}"]`);
        
        previousSteps.forEach(step => {
            step.classList.remove('current-step');
        });
        
        currentSteps.forEach(step => {
            step.classList.add('current-step');
        });

        sequencerData.forEach((channelData, channelIndex) => {
            if (channelData[currentStep]) {
                const slide = slideValues[channelIndex] * interval;
                setTimeout(() => playSample(channelIndex), slide);
                blinkButton(channelIndex);
            }
        });

        currentStep = (currentStep + 1) % steps;
    }

    function playSample(channel) {
        const audioElement = document.getElementById(`sample${channel + 1}`);
        if (audioElement) {
            audioElement.currentTime = 0;
            audioElement.play().catch(error => {
                console.error(`Error playing sample ${channel + 1}:`, error);
            });
        }
    }

    function blinkButton(channel) {
        const pad = document.getElementById(`pad${channel + 1}`);
        if (pad) {
            pad.classList.add('blink');
            setTimeout(() => {
                pad.classList.remove('blink');
            }, 500); // Match the duration of the blink animation
        }
    }

    playButton.addEventListener('click', function() {
        currentStep = 0;
        sequencerInterval = setInterval(playStep, interval);
        if (recording) {
            stopRecording();
        }
    });

    stopButton.addEventListener('click', function() {
        clearInterval(sequencerInterval);
        const steps = document.querySelectorAll('.sequencer-step');
        steps.forEach(step => step.classList.remove('current-step'));
        if (recording) {
            stopRecording();
        }
    });

    recordButton.addEventListener('click', function() {
        if (!recording) {
            startRecording();
            recordButton.textContent = "Stop Recording";
        } else {
            stopRecording();
            recordButton.textContent = "Record";
        }
    });

    function startRecording() {
        recording = true;
        recordedEvents = [];
        recordingStartTime = Date.now();
        currentStep = 0;
        sequencerInterval = setInterval(playStep, interval);
    }

    function stopRecording() {
        recording = false;
        clearInterval(sequencerInterval);
    }

    function recordEvent(channel, step) {
        if (recording) {
            recordedEvents.push({ channel, step, time: Date.now() - recordingStartTime });
            sequencerData[channel][step] = true;
            updateSequencerGrid();
        }
    }

    bpmRange.addEventListener('input', function() {
        tempo = parseInt(this.value);
        interval = (60 / tempo) / 4 * 1000;
        bpmDisplay.textContent = this.value;
        if (sequencerInterval) {
            clearInterval(sequencerInterval);
            sequencerInterval = setInterval(playStep, interval);
        }
    });

    channelSections.forEach((channel, index) => {
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

    // Extend the existing event listeners for pads
    const pads = document.querySelectorAll('.pads button');
    pads.forEach((pad, index) => {
        pad.addEventListener('mousedown', function() {
            pad.classList.add('active-button');
        });
        pad.addEventListener('mouseup', function() {
            pad.classList.remove('active-button');
        });
        pad.addEventListener('mouseleave', function() {
            pad.classList.remove('active-button');
        });
        pad.addEventListener('click', function() {
            recordEvent(index, currentStep);
            const audioElement = document.getElementById(`sample${index + 1}`);
            if (audioElement) {
                audioElement.currentTime = 0;
                audioElement.play().catch(error => {
                    console.error(`Error playing sample ${index + 1}:`, error);
                });
            }
        });
    });

    // Slide, delay, and reverb controls
    const slideControls = [];
    const delayControls = [];
    const reverbControls = [];
    for (let i = 1; i <= 8; i++) {
        const slideControl = document.getElementById(`slide${i}`);
        slideControl.addEventListener('input', function() {
            slideValues[i - 1] = parseFloat(this.value);
        });
        slideControls.push(slideControl);

        const delayControl = document.getElementById(`delay${i}`);
        delayControl.addEventListener('input', function() {
            delayValues[i - 1] = parseFloat(this.value);
        });
        delayControls.push(delayControl);

        const reverbControl = document.getElementById(`reverb${i}`);
        reverbControl.addEventListener('input', function() {
            reverbValues[i - 1] = parseFloat(this.value);
        });
        reverbControls.push(reverbControl);
    }
});
