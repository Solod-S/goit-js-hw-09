import flatpickr from "flatpickr";
// импорт flatpickr
console.log(flatpickr);
import "flatpickr/dist/flatpickr.min.css";
// Дополнительный импорт стилей
import Notiflix from "notiflix";
// импорт notiflix
import { Notify } from "notiflix/build/notiflix-notify-aio";
//
Notify.info("Какой-то ад.... а не задание =)");
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      // если выбраное время меньше текущего (прям вот текущего-текущего)
      Notify.failure("Please choose a date in the future");
      // вместо алерта выводим меседж
      timer.startBtn.disabled = true;
      //делаем кнопку не активной (она может быть активной после прошлых действий)
      return;
      // обрываем функцию
    }
    timer.startBtn.disabled = false;
    //делаем кноку активной
    timer.selectedDates = selectedDates[0];
  },
};
// настройки для flatpickr

flatpickr("#datetime-picker", options);
// инициализация библиотеки на  <input type="text" id="datetime-picker" /> + передаем настройки (options)

const timer = {
  startBtn: document.querySelector("[data-start]"),
  daysEl: document.querySelector("[data-days]"),
  hoursEl: document.querySelector("[data-hours]"),
  minutesEl: document.querySelector("[data-minutes]"),
  secondsEl: document.querySelector("[data-seconds]"),
  intervalId: null,
  selectedDates: null,
  start() {
    timer.intervalId = setInterval(() => {
      // записуем в свойство объекта интервал айди

      const deltaTime = timer.selectedDates - Date.now();
      // получаем разницу между выбраной датой и текущим временем (время старта) (проще говоря получаем текущее время)
      console.log(convertMs(deltaTime));
      //{days: 0, hours: 0, minutes: 0, seconds: 0}
      if (deltaTime <= 0) {
        clearTimeout(timer.intervalId);
        return;
      }
      timer.updateClockFace(deltaTime);
    }, 1000);
  },
  updateClockFace(deltaTime) {
    const { days, hours, minutes, seconds } = deltaTime;
    timer.daysEl.textContent = days;
    timer.hoursEl.textContent = hours;
    timer.minutesEl.textContent = minutes;
    timer.secondsEl.textContent = seconds;
  },
};
timer.startBtn.disabled = true;
// по умолчанию кнопка не активна

timer.startBtn.addEventListener("click", timer.start);

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
// Для подсчета значений используй готовую функцию convertMs, где ms - разница между конечной и текущей датой в миллисекундах.
/*
 * Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
 */
function pad(value) {
  return String(value).padStart(2, "0");
  // приобразует в строку,  если длина меньше 2 то слева добавляет 0
  // 1 ==> 01 // 12 ==> 12 // 5 ==> 05

  if (value < 10) {
    return "0" + String(value);
  } else {
    return String(value);
  }
  //если значение меньше 10 то плюсуем ноль вперед и значение переводим в строку
}
