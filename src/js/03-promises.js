import Notiflix from "notiflix";
// импорт notiflix
import { Notify } from "notiflix/build/notiflix-notify-aio";
// деструктуризация Notiflix.Notify

function createPromise(attempt, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      //запускаю отложенный запуск
      if (shouldResolve) {
        resolve({ attempt, delay });
        // если генерит тру в функцию resolve и передаю {attempt, delay}
      } else {
        reject({ attempt, delay });
        // если генерит фалс в функцию reject и передаю {attempt, delay}
      }
    }, delay);
    //задерка приходит обновленная на каждой итерации
  });
}

const randomizePromises = {
  delay: null,
  step: null,
  amount: null,
  formEl: document.querySelector(".form"),
  delayEl: document.querySelector('input[name="delay"]'),
  stepEl: document.querySelector('input[name="step"]'),
  amountEl: document.querySelector('input[name="amount"]'),
  colectingDate() {
    this.delay = Number(this.delayEl.value);
    //записуем в ключ то, что введено в поле <input type="number" name="delay" required /> + приобразуем его к цифрам
    this.step = Number(this.stepEl.value);
    // записуем в ключ то, что введено в поле <input type="number" name="step" required /> + приобразуем его к цифрам
    this.amount = Number(this.amountEl.value);
    // записуем в ключ то, что введено в поле <input type="number" name="amount" required /> + приобразуем его к цифрам
  },
  onSubmit(event) {
    event.preventDefault();
    this.colectingDate();
    // обрыв перезагрузки при сабмите

    let { delay, step, amount } = this;
    // // деструктуризация нужных нам параметров (задержка, шаг и количество попыток)

    for (let attempt = 1; attempt <= amount; attempt += 1) {
      // запуск цикла в котором будем запускать функцию создания промиса и передавать туда нужные анм параметры
      //(delay - задержка будет изменяться на каждой итерации, на каждой итерации плюсуем к ней step - шаг )
      createPromise(attempt, delay)
        // вызов функции создания промиса (с setTimeout)
        .then(({ attempt, delay }) => {
          // если в createPromise shouldResolve выдало true и вызвалась функция resolve
          Notify.success(
            `✅ Fulfilled promise ${attempt} attempt in ${delay}ms`
          );
        })
        .catch(({ attempt, delay }) => {
          // если в createPromise shouldResolve выдало false и вызвалась функция reject
          Notify.failure(
            `❌ Rejected promise ${attempt} attempt in ${delay}ms`
          );
        });
      delay = delay + step;
      //на каждой итерации обновляю задержку
    }
  },
};

randomizePromises.formEl.addEventListener(
  "submit",
  randomizePromises.onSubmit.bind(randomizePromises)
);

Notify.init({
  width: "280px",
  position: "right-bottom", // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
  distance: "10px",
  opacity: 1,
  borderRadius: "20%",
  rtl: false,
  timeout: 3000,
  messageMaxLength: 110,
  backOverlay: false,
  backOverlayColor: "rgba(0,0,0,0.5)",
  plainText: true,
  showOnlyTheLastOne: false,
  clickToClose: false,
  pauseOnHover: true,

  ID: "NotiflixNotify",
  className: "notiflix-notify",
  zindex: 4001,
  fontFamily: "Quicksand",
  fontSize: "17px",
  cssAnimation: true,
  cssAnimationDuration: 400,
  cssAnimationStyle: "fade" - "zoom", // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
  closeButton: false,
  useIcon: false,
  useFontAwesome: true,
  fontAwesomeIconStyle: "basic" - "shadow", // 'basic' - 'shadow'
  fontAwesomeIconSize: "34px",

  success: {
    background: "#32c682",
    textColor: "#fff",
    childClassName: "notiflix-notify-success",
    notiflixIconColor: "rgba(0,0,0,0.2)",
    fontAwesomeClassName: "fas fa-check-circle",
    fontAwesomeIconColor: "rgba(0,0,0,0.2)",
    backOverlayColor: "rgba(50,198,130,0.2)",
  },

  failure: {
    background: "#ff5549",
    textColor: "#fff",
    childClassName: "notiflix-notify-failure",
    notiflixIconColor: "rgba(0,0,0,0.2)",
    fontAwesomeClassName: "fas fa-times-circle",
    fontAwesomeIconColor: "rgba(0,0,0,0.2)",
    backOverlayColor: "rgba(255,85,73,0.2)",
  },

  warning: {
    background: "#F5F4FA",
    textColor: "#fff",
    childClassName: "notiflix-notify-warning",
    notiflixIconColor: "rgba(0,0,0,0.2)",
    fontAwesomeClassName: "fas fa-exclamation-circle",
    fontAwesomeIconColor: "rgba(0,0,0,0.2)",
    backOverlayColor: "rgba(238,191,49,0.2)",
  },

  info: {
    background: "#2196F3",
    textColor: "#FFFFFF",
    childClassName: "notiflix-notify-info",
    notiflixIconColor: "rgba(255,255,255)",
    fontAwesomeClassName: "fas fa-info-circle",
    fontAwesomeIconColor: "rgba(0,0,0,0.2)",
    backOverlayColor: "rgba(38,192,211,0.2)",
  },
});
