const refs = {
  startbtn: document.querySelector('[data-start]'),
  stopbtn: document.querySelector('[data-stop]'),
};
let timerId = null;

refs.startbtn.addEventListener('click', onStartClick);
refs.stopbtn.addEventListener('click', onStopClick);

function onStartClick(e) {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  e.target.disabled = true;
}

function onStopClick() {
  clearInterval(timerId);
  refs.startbtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
