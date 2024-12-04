// grab the keys
let keyButtons = document.querySelectorAll(".synth-key");
// init the octave
let octave = 2;

// Keyboard key-to-note mapping
const keyToNote = {
    'a': 'c',
    's': 'd',
    'd': 'e',
    'f': 'f',
    'g': 'g',
    'h': 'a',
    'j': 'b',
    'k': 'c2',
    'w': 'cs',
    'e': 'ds',
    't': 'fs',
    'y': 'gs',
    'u': 'as'
};

// Sound array for notes
let sounds = {};

// populate sound array
for (let i = 0; i < keyButtons.length; i++) {
    const note = keyButtons[i].id
    sounds[note] = {};
    
    for (let o = 1; o <= 3; o++) {
        sounds[note][o] = new Audio(`../assets/sounds/${note}${o}.wav`);
    }

    // add appropriate event listeners
    keyButtons[i].addEventListener("click", function () {
        sounds[note][octave].currentTime = 0; // Reset sound to start
        sounds[note][octave].play();
    });
}

// to stop spamming buttons
let debounceTimeout;
function debounce(func, delay) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(func, delay);
}

// get the sounds and the elements needed
let actionSound = new Audio(`../assets/sounds/action-sound.wav`);
let noNote = new Audio(`../assets/sounds/no-sound.wav`);
let octaveText = document.getElementById("octave-text");
let lowerOctaveButton = document.getElementById("down-octave");
let increaseOctaveButton = document.getElementById("up-octave");

function updateOctaveUI() {
    octaveText.textContent = `octave: ${octave}`;
    lowerOctaveButton.disabled = octave <= 1;
    increaseOctaveButton.disabled = octave >= 3;
}

lowerOctaveButton.addEventListener("click", function () {
    debounce(() => {
        if (octave > 1) {
            octave--;
            actionSound.play();
            updateOctaveUI();
        }
    }, 100)
});

increaseOctaveButton.addEventListener("click", function () {
    debounce(() => {
        if (octave < 3) {
            octave++;
            actionSound.play();
            updateOctaveUI();
        }
    }, 100)

});

updateOctaveUI();

let keysPressed = {};

document.addEventListener('keydown', function (event) {
    const note = keyToNote[event.key.toLowerCase()];
    if (note && sounds[note] && sounds[note][octave] && !keysPressed[event.key]) {
        keysPressed[event.key] = true;
        const button = document.getElementById(note);
        if (button) {
            button.classList.add('active'); // Add the "active" class
            setTimeout(() => button.classList.remove('active'), 200);
        }
        sounds[note][octave].currentTime = 0;
        sounds[note][octave].play();
    } else if (!keysPressed[event.key]) {
        noNote.play();
    }
});

// Reset the key state
document.addEventListener('keyup', function (event) {
    keysPressed[event.key] = false;
});