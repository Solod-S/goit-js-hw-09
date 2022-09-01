const { setInterval } = require("core-js");

const colorSwitcher = {
  body: document.querySelector("body"),
  // display: document.querySelector(".color"),
  startBtn: document.querySelector("[data-start]"),
  stoptBtn: document.querySelector("[data-stop]"),
  intervalId: null,
  start() {
    document.querySelector("[data-start]").disabled = true;
    //делаем кнопку старт неактивной
    document.querySelector("[data-stop]").disabled = false;
    //делаем кнопку стоп активной
    colorSwitcher.intervalId = setInterval(() => {
      colorSwitcher.changeColorFn();
    }, 1000);
    // запускаем интервальный запуск функции по смене цвета
  },
  stop() {
    document.querySelector("[data-start]").disabled = false;
    //делаем кнопку старт активной
    document.querySelector("[data-stop]").disabled = true;
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

colorSwitcher.startBtn.addEventListener("click", colorSwitcher.start);
colorSwitcher.stoptBtn.addEventListener("click", colorSwitcher.stop);
