let minutes = 0;
let seconds = 0;
let interval;
let isTimerRunning = false;
let A= 0;
let B= 0;
let C= 0;
let D= 0;

function setTimeDigit(digit) {
    const digitString = digit.toString();

    if (!isTimerRunning) {
        A = B;
        B = C;
        C = D;
        D = parseInt(digitString);

        minutes = A * 10 + B;
        seconds = C * 10 + D;

        if (minutes > 59) {
            resetTimer();
        }
        updateDisplay();
    } else {
        checkAndHighlightDigit(digit);
  }
}

function checkAndHighlightDigit(digit) {
    const digitElement = document.getElementById(`digit-${digit}`);
    const appContainer = document.getElementById('app-container');

    if (digit === B || digit === C || digit === D) {
        digitElement.classList.add('green');
        appContainer.style.backgroundColor = 'limegreen';
        playSound('ding.mp3');
        setTimeout(() => {
            digitElement.classList.remove('green');
            appContainer.style.backgroundColor = ''; // Réinitialiser la couleur de fond
        }, 1000);
    } else {
        digitElement.classList.add('red');
        appContainer.style.backgroundColor = 'tomato';
        playSound('meh.mp3');
        setTimeout(() => {
            digitElement.classList.remove('red');
            appContainer.style.backgroundColor = ''; // Réinitialiser la couleur de fond
        }, 1000);
    }
}
function startStopTimer() {
    const startStopBtn = document.getElementById('startStopBtn');

    if (isTimerRunning) {
        clearInterval(interval);
        isTimerRunning = false;
        startStopBtn.innerText = 'Start';
        startStopBtn.classList.remove('stop'); 
    } else {
        if (minutes > 0 || seconds > 0) {
            interval = setInterval(updateTimer, 1000);
            isTimerRunning = true;
            startStopBtn.innerText = 'Stop';
            startStopBtn.classList.add('stop'); 
        }
    }
}


function resetTimer() {
    if (!isTimerRunning) {
    clearInterval(interval);
    minutes = 0;
    seconds = 0;
    A = 0;
    B = 0;
    C = 0;
    D = 0;
    isTimerRunning = false;
    const startStopBtn = document.getElementById('startStopBtn');
    startStopBtn.innerText = 'Start';
    startStopBtn.classList.remove('stop'); // Ajout de cette ligne
    updateDisplay();
}
}

function updateTimer() {
    if (minutes === 0 && seconds === 0) {
        clearInterval(interval);
        playSound('pouet.mp3');
        isTimerRunning = false;
        document.getElementById('startStopBtn').innerText = 'Start';
        return;
    }

    if (seconds === 0) {
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }
    A = Math.floor(minutes / 10);
    B = minutes % 10;
    C = Math.floor(seconds / 10);
    D = seconds % 10;

    updateDisplay();
}

function updateDisplay() {
    document.getElementById('minutes').innerText = minutes < 10 ? `${minutes}` : minutes;
    document.getElementById('seconds').innerText = seconds < 10 ? `0${seconds}` : seconds;
}

function playSound(soundFile) {
    const audio = new Audio(soundFile);
    audio.play();
}
