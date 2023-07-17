// Click Event Listeners 
 // check if context is in suspended state (autoplay policy)
 if (AudioContext.state === 'suspended') {
    AudioContext.resume();
  }

//Pad 1
pad1.addEventListener('click', function() {
    audioElement1.load();
    audioElement1.play();
    pad1.onmouseleave = function() {
        if (document.selection) // IE
        document.selection.empty();
        else
        window.getSelection().removeAllRanges();
    }
});

// Pad 2
pad2.addEventListener('click', function() {
    audioElement2.load();
    audioElement2.play();
    pad2.onmouseleave = function() {
        if (document.selection) // IE
        document.selection.empty();
        else
        window.getSelection().removeAllRanges();
    }
});

// Pad 3
pad3.addEventListener('click', function() {
    audioElement3.load();
    audioElement3.play();
    pad3.onmouseleave = function() {
        if (document.selection) // IE
        document.selection.empty();
        else
        window.getSelection().removeAllRanges();
    }
});

// Pad 4
pad4.addEventListener('click', function() {   
    audioElement4.load();
    audioElement4.play();
    pad4.onmouseleave = function() {
        if (document.selection) // IE
        document.selection.empty();
        else
        window.getSelection().removeAllRanges();
   }
});

// Pad 5
pad5.addEventListener('click', function() {  

    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // play or pause track depending on state
    if (this.dataset.playing === 'false') {
        audioElement5.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        audioElement5.load();
        audioElement5.play();
        this.dataset.playing = 'true';
    }
    pad5.onmouseleave = function() {
        if (document.selection) // IE
        document.selection.empty();
        else
        window.getSelection().removeAllRanges();
    }

}, false);

audioElement5.addEventListener('ended', () => {
    pad5.dataset.playing = 'false';
}, false);

// Pad 6
pad6.addEventListener('click', function() {   

    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // play or pause track depending on state
    if (this.dataset.playing === 'false') {
        audioElement6.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        audioElement6.load();
        audioElement6.play();
        this.dataset.playing = 'true';
    }
    pad6.onmouseleave = function() {
        if (document.selection) // IE
        document.selection.empty();
        else
        window.getSelection().removeAllRanges();
    }

}, false);

audioElement6.addEventListener('ended', () => {
    pad6.dataset.playing = 'false';
}, false);

// Pad 7
pad7.addEventListener('click', function() {    

    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // play or pause track depending on state
    if (this.dataset.playing === 'false') {
        audioElement7.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        audioElement7.load();
        audioElement7.play();
        this.dataset.playing = 'true';
    }
    pad7.onmouseleave = function() {
        if (document.selection) // IE
        document.selection.empty();
        else
        window.getSelection().removeAllRanges();
    }

}, false);


audioElement7.addEventListener('ended', () => {
    pad7.dataset.playing = 'false';
}, false);

//Pad 8
pad8.addEventListener('click', function() {    

    // play track depending on state
    if (this.dataset.playing === 'false') {
        audioElement8.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        audioElement8.load();
        audioElement8.play();
        this.dataset.playing = 'true';
    }
    pad8.onmouseleave = function() {
        if (document.selection) // IE
        document.selection.empty();
        else
        window.getSelection().removeAllRanges();
    }

}, false);


audioElement8.addEventListener('ended', () => {
    pad8.dataset.playing = 'false';
}, false);