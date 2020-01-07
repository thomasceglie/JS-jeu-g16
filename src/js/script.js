const viewportWidth = window.innerWidth; 
const stepAstronauteMove = 10;
const stepBackgroundMove = 100; 
const limitPercentageFirstVP = 0.75; 
const viewportHeight = window.innerHeight;

let astronauteXOffset = 0;
let backgroundXPosition = 0;

function launchIntro() {
  oxo.screens.loadScreen('intro', function() {
    const buttonPlay = document.querySelector('button.start');
    buttonPlay.addEventListener('click', function () {
      launchGame()
    });
  });
}

function launchGame() {
  oxo.screens.loadScreen('game', function() {
    const selectors = {
      "astronaute": document.querySelector("svg.astronaute"),
      "background": document.querySelector("body.game")
    };

    selectors.background.style.backgroundPositionX = backgroundXPosition + "px";

    startEventListenerOnKeyPads(selectors);
  });
}


function isAstronauteAtVPLimit(astronaute) {
  const limitCalculate = viewportWidth * limitPercentageFirstVP;
  const astronauteXposition = oxo.animation.getPosition(astronaute).x;
  console.log("Astronaute position x: " + astronauteXposition + " limit: " + limitCalculate);
  return astronauteXposition >= limitCalculate;
}

function isBackgroundNotAtTheEnd() {
  return backgroundXPosition > 0
}

function startEventListenerOnKeyPads(selectors) {
  oxo.inputs.listenKey('up', function () {
    console.log("up");
    oxo.animation.move(selectors.astronaute, 'up', stepAstronauteMove);
  });

  oxo.inputs.listenKey('down', function () {
    console.log("down");
    oxo.animation.move(selectors.astronaute, 'down', stepAstronauteMove);
  });

  oxo.inputs.listenKey('right', function () {
    console.log("right");
    console.log("is the astronaute reach the limit VP ? => " + isAstronauteAtVPLimit(selectors.astronaute));
    if (isAstronauteAtVPLimit(selectors.astronaute) == false) {
      astronauteXOffset += stepAstronauteMove;
      oxo.animation.move(selectors.astronaute, 'right', stepAstronauteMove);
    } else {
      astronauteXOffset += stepAstronauteMove;
      backgroundXPosition += stepBackgroundMove;
      selectors.background.style.backgroundPositionX = backgroundXPosition * -1 + "px";
      console.log(selectors.background.style.backgroundPositionX);
    }
  });

  oxo.inputs.listenKey('left', function () {
    console.log("left");
    //|| isBackgroundAfterLimit()
    if (isBackgroundNotAtTheEnd()) {
      astronauteXOffset -= stepAstronauteMove;
      backgroundXPosition -= stepBackgroundMove;
      selectors.background.style.backgroundPositionX = backgroundXPosition * -1 + "px";
      console.log(selectors.background.style.backgroundPositionX);
    } else {
      astronauteXOffset -= stepAstronauteMove;
      oxo.animation.move(selectors.astronaute, 'left', stepAstronauteMove);
    }
  });
}

launchIntro()
