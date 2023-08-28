import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/dark.css');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
  startbtn: document.querySelector('[data-start]'),
};

refs.startbtn.disabled = true;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const timeDifference = selectedDates[0].getTime() - Date.now();
    if (timeDifference > 0) {
      refs.startbtn.disabled = false;
      refs.startbtn.addEventListener('click', () => {
        startCountdown(timeDifference);
        Notify.success('The countdown is on!');
        refs.startbtn.disabled = true;
      });
    } else {
      Notify.failure('Please choose a date in the future');
    }
  },
});

function startCountdown(timeDifference) {
  const countdownId = setInterval(() => {
    if (timeDifference > 0) {
      setTime(convertMs(timeDifference));
      timeDifference -= 1000;
    } else {
      Notify.success('Time is up!');
      clearInterval(countdownId);
    }
  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function setTime(leadingTime) {
  refs.daysEl.textContent = addLeadingZero(leadingTime.days);
  refs.hoursEl.textContent = addLeadingZero(leadingTime.hours);
  refs.minutesEl.textContent = addLeadingZero(leadingTime.minutes);
  refs.secondsEl.textContent = addLeadingZero(leadingTime.seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
