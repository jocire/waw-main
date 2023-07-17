// trigger pads with the keys a,s,d,f,g,h,j,k

pad1.addEventListener('keydown', trigger);
pad2.addEventListener('keydown', trigger);
pad3.addEventListener('keydown', trigger);
pad4.addEventListener('keydown', trigger);
pad5.addEventListener('keydown', trigger);
pad6.addEventListener('keydown', trigger);
pad7.addEventListener('keydown', trigger);
pad8.addEventListener('keydown', trigger);

function trigger(e) {
  // check if context is in suspended state (autoplay policy)
  if (AudioContext.state === 'suspended') {
    AudioContext.resume();const audioCtx = new AudioContext();
  }
   
  if (e.keyCode === 65) {
    e.preventDefault();
    document.getElementById("pad1").click(); 
    document.getElementById("pad1").classList.add("padcolor");     
    setTimeout(remove, 150); 
    function remove() {
      document.getElementById("pad1").classList.remove("padcolor");
    }
  } else if (e.keyCode === 83) {
    e.preventDefault();
    document.getElementById("pad2").click();
    document.getElementById("pad2").classList.add("padcolor");     
    setTimeout(remove, 150); 
    function remove() {
      document.getElementById("pad2").classList.remove("padcolor");
    }
  } else if (e.keyCode === 68) {
    e.preventDefault();    
    document.getElementById("pad3").click();
    document.getElementById("pad3").classList.add("padcolor");     
    setTimeout(remove, 150); 
    function remove() {
      document.getElementById("pad3").classList.remove("padcolor");
    }
  } else if (e.keyCode === 70) {
    e.preventDefault();
    document.getElementById("pad4").click();
    document.getElementById("pad4").classList.add("padcolor");     
    setTimeout(remove, 150); 
    function remove() {
      document.getElementById("pad4").classList.remove("padcolor");
    }
  } else if (e.keyCode === 71) {
    e.preventDefault();
    document.getElementById("pad5").click();
    document.getElementById("pad5").classList.add("padcolor");     
    setTimeout(remove, 150); 
    function remove() {
      document.getElementById("pad5").classList.remove("padcolor");
    }
  } else if (e.keyCode === 72) {
    e.preventDefault();
    document.getElementById("pad6").click();
    document.getElementById("pad6").classList.add("padcolor");     
    setTimeout(remove, 150); 
    function remove() {
      document.getElementById("pad6").classList.remove("padcolor");
    }
  } else if (e.keyCode === 74) {
    e.preventDefault();
    document.getElementById("pad7").click();
    document.getElementById("pad7").classList.add("padcolor");     
    setTimeout(remove, 150); 
    function remove() {
      document.getElementById("pad7").classList.remove("padcolor");
    }
  } else if (e.keyCode === 75) {
    e.preventDefault();
    document.getElementById("pad8").click();
    document.getElementById("pad8").classList.add("padcolor");     
    setTimeout(remove, 150); 
    function remove() {
      document.getElementById("pad8").classList.remove("padcolor");
    }
  }
}
