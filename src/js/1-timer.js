import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const btnStart = document.querySelector("[data-start]");
const inputDatetimePicker = document.querySelector("#datetime-picker");
const days = document.querySelector("[data-days]");
const hours = document.querySelector("[data-hours]");
const minutes = document.querySelector("[data-minutes]");
const seconds = document.querySelector("[data-seconds]");

let userSelectedDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      userSelectedDate = selectedDates[0];

      if (userSelectedDate <= new Date()) {
        iziToast.error({
            title: 'Error',
            message: 'Please choose a date in the future',
            position: 'topCenter',
            backgroundColor: '#EF4040',
            class: 'show-error',
        });
        btnStart.disabled = true;
      } else {
        btnStart.disabled = false;
      }
    },
  };

flatpickr(inputDatetimePicker, options); 

btnStart.disabled = true;

btnStart.addEventListener("click", () => {
    if(userSelectedDate && userSelectedDate > new Date()) {
        startCountDown(userSelectedDate);
        inputDatetimePicker.disabled = true;
        btnStart.disabled = true;
    } else {
        iziToast.show({
            message: 'Please choose a valide date in the future',
            position: 'topCenter',
            backgroundColor: '#EF4040',
            class: 'show-error',
        });
    }
});

function startCountDown(endDate) {
    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const ms = endDate - now;

        if (ms <= 0) {
            clearInterval(countdownInterval);
            alert("Countdown finished!");
            btnStart.disabled = false;
            inputDatetimePicker.disabled = false; 
            return;
        }
        let convertedMs = convertMs(ms);
        console.log(convertedMs);

        days.innerHTML = addLeadingZero(convertedMs.days);
        hours.innerHTML = addLeadingZero(convertedMs.hours);
        minutes.innerHTML = addLeadingZero(convertedMs.minutes);
        seconds.innerHTML = addLeadingZero(convertedMs.seconds);
    }, 1000);
 
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
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
  };