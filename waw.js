// Create Audio Context Instance
// for legacy browsers

const AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();

 // check if context is in suspended state (autoplay policy)
 if (AudioContext.state === 'suspended') {
  AudioContext.resume();
}

const pannerOptions = { pan: 0 };

// Connectors
const panner1 = new StereoPannerNode(audioContext, pannerOptions);
const panner2 = new StereoPannerNode(audioContext, pannerOptions);
const panner3 = new StereoPannerNode(audioContext, pannerOptions);
const panner4 = new StereoPannerNode(audioContext, pannerOptions);
const panner5 = new StereoPannerNode(audioContext, pannerOptions);
const panner6 = new StereoPannerNode(audioContext, pannerOptions);
const panner7 = new StereoPannerNode(audioContext, pannerOptions);
const panner8 = new StereoPannerNode(audioContext, pannerOptions);

const gainNode1 = audioContext.createGain();
const gainNode2 = audioContext.createGain();
const gainNode3 = audioContext.createGain();
const gainNode4 = audioContext.createGain();
const gainNode5 = audioContext.createGain();
const gainNode6 = audioContext.createGain();
const gainNode7 = audioContext.createGain();
const gainNode8 = audioContext.createGain();

// get the audio element
const audioElement1 = document.getElementById('sample1');
const audioElement2 = document.getElementById('sample2');
const audioElement3 = document.getElementById('sample3');
const audioElement4 = document.getElementById('sample4');
const audioElement5 = document.getElementById('sample5');
const audioElement6 = document.getElementById('sample6');
const audioElement7 = document.getElementById('sample7');
const audioElement8 = document.getElementById('sample8');

// pass it into the audio context
const track1 = audioContext.createMediaElementSource(audioElement1);
const track2 = audioContext.createMediaElementSource(audioElement2);
const track3 = audioContext.createMediaElementSource(audioElement3);
const track4 = audioContext.createMediaElementSource(audioElement4);
const track5 = audioContext.createMediaElementSource(audioElement5);
const track6 = audioContext.createMediaElementSource(audioElement6);
const track7 = audioContext.createMediaElementSource(audioElement7);
const track8 = audioContext.createMediaElementSource(audioElement8);

// Pads
const pad1 = document.getElementById('pad1');
const pad2 = document.getElementById('pad2');
const pad3 = document.getElementById('pad3');
const pad4 = document.getElementById('pad4');
const pad5 = document.getElementById('pad5');
const pad6 = document.getElementById('pad6');
const pad7 = document.getElementById('pad7');
const pad8 = document.getElementById('pad8');

// Faders
const volumeControl1 = document.getElementById('volume1');
const volumeControl2 = document.getElementById('volume2');
const volumeControl3 = document.getElementById('volume3');
const volumeControl4 = document.getElementById('volume4');
const volumeControl5 = document.getElementById('volume5');
const volumeControl6 = document.getElementById('volume6');
const volumeControl7 = document.getElementById('volume7');
const volumeControl8 = document.getElementById('volume8');

// Panners
const pannerControl1 = document.querySelector('#panner1');
const pannerControl2 = document.querySelector('#panner2');
const pannerControl3 = document.querySelector('#panner3');
const pannerControl4 = document.querySelector('#panner4');
const pannerControl5 = document.querySelector('#panner5');
const pannerControl6 = document.querySelector('#panner6');
const pannerControl7 = document.querySelector('#panner7');
const pannerControl8 = document.querySelector('#panner8');

//Output 
track1.connect(gainNode1).connect(panner1).connect(audioContext.destination);
track2.connect(gainNode2).connect(panner2).connect(audioContext.destination);
track3.connect(gainNode3).connect(panner3).connect(audioContext.destination);
track4.connect(gainNode4).connect(panner4).connect(audioContext.destination);
track5.connect(gainNode5).connect(panner5).connect(audioContext.destination);
track6.connect(gainNode6).connect(panner6).connect(audioContext.destination);
track7.connect(gainNode7).connect(panner7).connect(audioContext.destination);
track8.connect(gainNode8).connect(panner8).connect(audioContext.destination);





