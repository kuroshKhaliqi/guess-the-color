let btnsContainerElement = document.getElementById("btns");
let btnElement1 = document.getElementById("btn1");
let btnElement2 = document.getElementById("btn2");
let btnElement3 = document.getElementById("btn3");
let btnElement4 = document.getElementById("btn4");
let btnElement5 = document.getElementById("btn5");
let btnElement6 = document.getElementById("btn6");
let btnElement7 = document.getElementById("btn7");
let btnElement8 = document.getElementById("btn8");
let btnElement9 = document.getElementById("btn9");

let hexElement = document.getElementById("hex");
let modesElement = document.getElementById("modes");
let pointsElement = document.getElementById("points");

btnsContainerElement.addEventListener("click", checkColor);
modesElement.addEventListener("click", startTheGame);
let timerId;

let colorList = [
  "darkgreen",
  "brown",
  "lightgreen",
  "blue",
  "lightsalmon",
  "green",
  "purple",
  "aqua",
  "orange",
];

let buttonElements = [
  btnElement1,
  btnElement2,
  btnElement3,
  btnElement4,
  btnElement5,
  btnElement6,
  btnElement7,
  btnElement8,
  btnElement9,
];
let randomSelectedColor;
let points = 0;
let level = 1;

shuffleColors();

paintButtons();

function paintButtons() {
  for (let i = 0; i < buttonElements.length; i++) {
    let currentBtn = buttonElements[i];
    currentBtn.style.backgroundColor = colorList[i];
  }
}

function shuffleColors() {
  colorList.sort((a, b) => (Math.random() > 0.5 ? 1 : -1));
  paintButtons();
}

function generateColor() {
  let random = Math.floor(Math.random() * 9);
  randomSelectedColor = colorList[random];
}
function showColor() {
  hexElement.innerText = randomSelectedColor;
}
function showPoints() {
  pointsElement.innerText = points;
}
function generateHexes() {
  for (let i = 0; i < buttonElements.length; i++) {
    let redPart = Math.floor(Math.random() * 256);
    let greenPart = Math.floor(Math.random() * 256);
    let bluePart = Math.floor(Math.random() * 256);
    colorList[i] = "rgb(" + redPart + ", " + greenPart + ", " + bluePart + ")";
  }
}

function checkColor(event) {
  let selcetedButton = event.target;
  let colorOfButton = selcetedButton.style.backgroundColor;
  console.log(colorOfButton);
  console.log(randomSelectedColor);
  if (level === "easy" || level === "medium") {
    if (colorOfButton == randomSelectedColor) {
      points += 10;
    }
  }
  if (level === "hard") {
    if (colorOfButton == randomSelectedColor) {
      points += 15;
    } else {
      points -= 20;
    }
  }
  if (level === "impossible") {
    if (colorOfButton == randomSelectedColor) {
      points += 1;
    } else {
      points -= 10;
    }
  }

  showPoints();

  if (points <= 0) {
    alert("You Loose");
    restartGame();
    return;
  }

  if (points === 100) {
    alert("You WON");
    restartGame();
    return;
  }

  shuffleColors();
  generateColor();
  showColor();
}

function restartGame() {
  location.reload();
}

function startTheGame(event) {
  let modeBtn = event.target;
  if (modeBtn.id === "easy") {
    level = "easy";
    points = 50;
  } else if (modeBtn.id == "medium") {
    level = "medium";

    points = 20;
    generateHexes();
  } else if (modeBtn.id === "hard") {
    level = "hard";
    points = 40;
    generateHexes();
  } else if (modeBtn.id === "impossible") {
    level = "impossible";
    points = 40;
    generateHexes();
    timerId = setInterval(decresePoints, 4000);
  } else {
    return;
  }
  showPoints();
  shuffleColors();
  paintButtons();
  generateColor();

  showColor();
}

function decresePoints() {
  points -= 5;
  showPoints();
  if (points <= 0) {
    clearInterval(timerId);
    alert("You loose");
    restartGame();
  }
}
