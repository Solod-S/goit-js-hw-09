const { setInterval } = require("core-js");

const colorSwitcher = {
  body: document.querySelector("body"),
  // display: document.querySelector(".color"),
  startBtn: document.querySelector("[data-start]"),
  stoptBtn: document.querySelector("[data-stop]"),
  intervalId: null,
  start() {
    this.startBtn.disabled = true;
    //делаем кнопку старт неактивной
    this.stoptBtn.disabled = false;
    //делаем кнопку стоп активной
    colorSwitcher.intervalId = setInterval(() => {
      colorSwitcher.changeColorFn();
    }, 1000);
    // запускаем интервальный запуск функции по смене цвета
  },
  stop() {
    this.startBtn.disabled = false;
    //делаем кнопку старт активной
    this.stoptBtn.disabled = true;
    //делаем кнопку стоп неактивной
    clearInterval(colorSwitcher.intervalId);
    // выключаем интервальный запуск функции по смене цвета
    // colorSwitcher.body.style.backgroundColor = "#FAFAFA";
    // можно сбросить цвет
  },
  changeColorFn() {
    colorSwitcher.body.style.backgroundColor =
      colorSwitcher.getRandomHexColor();
    // функция ставит в инлайно css body backgroundcolor который получае с другой функции
  },
  getRandomHexColor() {
    console.log(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  },
  // генератор случайных палитр
};

colorSwitcher.startBtn.addEventListener(
  "click",
  colorSwitcher.start.bind(colorSwitcher)
);
colorSwitcher.stoptBtn.addEventListener(
  "click",
  colorSwitcher.stop.bind(colorSwitcher)
);
//делаем бинд чтобы работал this в методах объекта
