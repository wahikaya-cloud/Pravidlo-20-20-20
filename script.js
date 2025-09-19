document.addEventListener("DOMContentLoaded", function() {
let timerInterval;
let countdownInterval;
let isRunning = false;
const oceanSound = document.getElementById('oceanSound');
const startBtn = document.getElementById('startBtn');
const timeDisplay = document.getElementById('time');
const modal = document.getElementById('modal');
const countdownDisplay = document.getElementById('countdown');
const startAnimation = document.getElementById('start-animation'); // Nový element

function startTimer() {
let timeLeft = 20 * 60; // 20 minut v sekundách
updateTimerDisplay(timeLeft);

// Zobrazení animace na začátku
startAnimation.classList.remove('hidden');

timerInterval = setInterval(() => {
timeLeft--;
updateTimerDisplay(timeLeft);

if (timeLeft <= 0) {
showModal();
timeLeft = 20 * 60; // Reset na 20 minut
}
}, 1000);
}

function updateTimerDisplay(seconds) {
const minutes = Math.floor(seconds / 60);
const secs = seconds % 60;
timeDisplay.textContent = `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function showModal() {
modal.classList.remove('hidden');
let countdown = 20; // 20 sekund
countdownDisplay.textContent = countdown;

// Zde se spouští zvuk, když se objeví modální okno
oceanSound.play();

countdownInterval = setInterval(() => {
countdown--;
countdownDisplay.textContent = countdown;
if (countdown <= 0) {
clearInterval(countdownInterval);
modal.classList.add('hidden');
oceanSound.pause();
oceanSound.currentTime = 0;
}
}, 1000);
}

function toggleTimer() {
if (isRunning) {
clearInterval(timerInterval);
startBtn.textContent = 'Spustit';
startBtn.classList.remove('stop');
timeDisplay.textContent = '20:00';
oceanSound.pause();
oceanSound.currentTime = 0;
modal.classList.add('hidden');
clearInterval(countdownInterval);
// Při zastavení skryjeme animaci
startAnimation.classList.add('hidden');
} else {
startTimer();
startBtn.textContent = 'Zastavit';
startBtn.classList.add('stop');
}
isRunning = !isRunning;
}

startBtn.onclick = toggleTimer;
});
