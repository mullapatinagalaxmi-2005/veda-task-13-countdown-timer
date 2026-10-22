const form = document.getElementById('date-form');
const input = document.getElementById('target-date');
const title = document.getElementById('timer-title');
const status = document.getElementById('status');
const fields = {
  days: document.getElementById('days'),
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds')
};
let targetTime = null;
let intervalId = null;

function pad(value) { return String(value).padStart(2, '0'); }

function updateCountdown() {
  if (targetTime === null) return;
  const remaining = targetTime - Date.now();

  if (remaining <= 0) {
    Object.values(fields).forEach(field => field.textContent = '00');
    status.textContent = '🎉 Countdown complete! Your target time has arrived.';
    clearInterval(intervalId);
    intervalId = null;
    return;
  }

  const total = Math.floor(remaining / 1000);
  fields.days.textContent = pad(Math.floor(total / 86400));
  fields.hours.textContent = pad(Math.floor((total % 86400) / 3600));
  fields.minutes.textContent = pad(Math.floor((total % 3600) / 60));
  fields.seconds.textContent = pad(total % 60);
  status.textContent = 'Time is ticking! Your countdown updates every second.';
}

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!input.value) {
    status.textContent = 'Please choose a target date and time.';
    return;
  }
  const selected = new Date(input.value).getTime();
  if (Number.isNaN(selected) || selected <= Date.now()) {
    status.textContent = 'Please choose a valid date and time in the future.';
    return;
  }
  targetTime = selected;
  title.textContent = new Date(targetTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
  if (intervalId !== null) clearInterval(intervalId);
  updateCountdown();
  intervalId = setInterval(updateCountdown, 1000);
});

const tomorrow = new Date(Date.now() + 86400000);
tomorrow.setSeconds(0, 0);
input.value = new Date(tomorrow.getTime() - tomorrow.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
