import flatpickr from "flatpickr";
// импорт flatpickr
import "flatpickr/dist/flatpickr.min.css";
// Дополнительный импорт стилей
import Notiflix from "notiflix";
// импорт notiflix
import { Notify } from "notiflix/build/notiflix-notify-aio";
//

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
    timer.startBtn.classList.add("is_active");
    //добавляем класс css (украшательство)
    timer.startBtn.disabled = false;
    //делаем кноку старт активной
    timer.selectedDates = selectedDates[0];
  },
};
// настройки для flatpickr

flatpickr("#datetime-picker", options);
// инициализация библиотеки на  <input type="text" id="datetime-picker" /> + передаем настройки (options)

const timer = {
  startBtn: document.querySelector("[data-start]"),
  stoptBtn: document.querySelector("[data-stop]"),
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
      // получаем разницу между выбраной датой и текущим временем (время старта)
      console.log(convertMs(deltaTime));
      //{days: 0, hours: 0, minutes: 0, seconds: 0}
      if (deltaTime <= 0) {
        // когда время станет = или < 0
        Notify.info("The end!");
        // выдадим меседж
        clearTimeout(timer.intervalId);
        // прикратим интервальный запуск функции
        timer.startBtn.classList.remove("is_active");
        //убирем класс css (украшательство)
        timer.startBtn.disabled = true;
        // кнопка старт снова станет не активна
        return;
      }
      timer.updateClockFace(convertMs(deltaTime));
    }, 1000);
  },
  stop() {
    timer.startBtn.disabled = true;
    // кнопка старт снова станет не активна
    timer.startBtn.classList.remove("is_active");
    //убирем класс css (украшательство)
    clearTimeout(timer.intervalId);
    // прикратим интервальный запуск функции
    timer.selectedDates = null;
    // обнуляем выбраное время
    timer.daysEl.textContent = "00";
    timer.hoursEl.textContent = "00";
    timer.minutesEl.textContent = "00";
    timer.secondsEl.textContent = "00";
    //обнуляем вывод времени в html
  },
  updateClockFace(deltaTime) {
    const { days, hours, minutes, seconds } = deltaTime;
    // деструктуризация
    timer.daysEl.textContent = pad(days);
    timer.hoursEl.textContent = pad(hours);
    timer.minutesEl.textContent = pad(minutes);
    timer.secondsEl.textContent = pad(seconds);
    // записуем в html текущии значения из deltaTime (часы, минуты....) + используем функцию pad, которая позвоялет правильно записывать 1-9 ==> 01-09
  },
};
timer.startBtn.disabled = true;
// по умолчанию кнопка старт не активна

timer.startBtn.addEventListener("click", timer.start);
// по клику на кнопку старт запускаем функцию старта
timer.stoptBtn.addEventListener("click", timer.stop);
// по клику на кнопку стоп запускаем функцию стопа

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

function pad(value) {
  return String(value).padStart(2, "0");
  // приобразует в строку,  если длина меньше 2 то слева добавляет 0
  // 1 ==> 01 // 12 ==> 12 // 5 ==> 05

  if (value < 10) {
    return "0" + String(value);
  } else {
    return String(value);
  }
  //если значение меньше 10 то плюсуем ноль вперед и значение переводим в строку (Репета говорил в ролике можно и так, но не красиво)
}

// Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
