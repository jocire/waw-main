let audioContext;
const audioElements = [];
const channels = [];

async function loadImpulseResponse(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return audioContext.decodeAudioData(arrayBuffer);
}

async function initializeAudioContext() {
    if (!audioContext) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
    }
    if (audioContext.state === 'suspended') {
        await audioContext.resume();
    }

    // Load the impulse response for the reverb effect
    const reverbBuffer = await loadImpulseResponse('src/233-R2_RoomAmb.wav');

    if (channels.length === 0) {
        // Initialize channels and connect nodes
        for (let i = 1; i <= 8; i++) {
            const audioElement = document.getElementById(`sample${i}`);
            audioElements.push(audioElement);

            const track = audioContext.createMediaElementSource(audioElement);            
            const channel = {
                panner: new StereoPannerNode(audioContext, { pan: 0 }),
                gain: audioContext.createGain(),
                delay: audioContext.createDelay(),
                reverb: audioContext.createConvolver()
            };           
            channel.reverb.buffer = reverbBuffer;

            // Connect nodes with a wet/dry mix for reverb
            const wetGain = audioContext.createGain();
            const dryGain = audioContext.createGain();
            dryGain.gain.value = 1; // Initialize with no reverb
            wetGain.gain.value = 0;

            track
                .connect(channel.delay)
                .connect(channel.gain)
                .connect(dryGain)
                .connect(channel.panner)
                .connect(audioContext.destination);

            channel.gain.connect(channel.reverb).connect(wetGain).connect(audioContext.destination);

            // Store wetGain node in the channel for later use
            channel.reverbGain = wetGain;

            channels.push(channel);
        }

        // Store channels in a global variable for use in other scripts
        window.channels = channels;
    }
}

// Ensure the AudioContext is resumed after a user gesture
document.body.addEventListener('click', initializeAudioContext);
