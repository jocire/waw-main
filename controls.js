document.addEventListener('DOMContentLoaded', function() {
    const slideValues = Array(8).fill(0);
    const delayValues = Array(8).fill(0);
    const reverbValues = Array(8).fill(0);
    const volumeValues = Array(8).fill(1);
    const panValues = Array(8).fill(0);

    for (let i = 1; i <= 8; i++) {
        const slideControl = document.getElementById(`slide${i}`);        
        slideControl.addEventListener('input', function() {
            slideValues[i - 1] = parseFloat(this.value);
        });

        const delayControl = document.getElementById(`delay${i}`);
        delayControl.addEventListener('input', function() {
            delayValues[i - 1] = parseFloat(this.value);
            if (window.channels) {
                window.channels[i - 1].delay.delayTime.value = delayValues[i - 1];
            }
        });

        const reverbControl = document.getElementById(`reverb${i}`);
        reverbControl.addEventListener('input', function() {
            reverbValues[i - 1] = parseFloat(this.value);
            if (window.channels) {
                const channel = window.channels[i - 1];
                const wetGain = channel.reverbGain || audioContext.createGain();
                wetGain.gain.value = reverbValues[i - 1];
                channel.reverbGain = wetGain;

                // Reconnect with new wet/dry mix
                channel.gain.disconnect();
                channel.reverb.disconnect();
                channel.gain.connect(channel.panner).connect(audioContext.destination);
                channel.gain.connect(channel.reverb).connect(wetGain).connect(audioContext.destination);
            }
        });

        const volumeControl = document.getElementById(`volume${i}`);
        volumeControl.addEventListener('input', function() {
            volumeValues[i - 1] = parseFloat(this.value);
            if (window.channels) {
                window.channels[i - 1].gain.gain.value = volumeValues[i - 1];
            }
        });

        const panControl = document.getElementById(`panner${i}`);
        panControl.addEventListener('input', function() {
            panValues[i - 1] = parseFloat(this.value);
            if (window.channels) {
                window.channels[i - 1].panner.pan.value = panValues[i - 1];
            }
        });
    }

    window.slideValues = slideValues;
    window.delayValues = delayValues;
    window.reverbValues = reverbValues;
    window.volumeValues = volumeValues;
    window.panValues = panValues;
});

