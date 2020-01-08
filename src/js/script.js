// Constant

const viewportWidth = window.innerWidth; 
const viewportHeight = window.innerHeight;
const stepAstronauteMove = 10;
const stepBackgroundMove = 80;
const limitPercentageFirstVP = 0.5;

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

    // Init backgroundPositionY to the end minus viewport
    backgroundYPosition = 6000;
    selectors.background.style.backgroundPositionY = backgroundYPosition + "px";

    startEventListenerOnKeyPads(selectors);
  });
}

launchIntro()


/*
// Constant
const viewportWidth = window.innerWidth; 
const viewportHeight = window.innerHeight;
const stepAstronauteMove = 10;
const stepBackgroundMove = 100; 
const limitPercentageFirstVP = 0.5;
const restartAstronauteToMoveFromBackground = 5000;
const heightBackground = 25578;


let astronauteYOffset = 0;
let backgroundYPosition = 0;

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

    // Init backgroundPositionY to the end minus viewport
    backgroundYPosition = 6000;
    selectors.background.style.backgroundPositionY = backgroundYPosition + "px";

    startEventListenerOnKeyPads(selectors);
  });
}


function isAstronauteAtVPLimit(astronaute) {
  const limitCalculate = viewportWidth * limitPercentageFirstVP;
  const astronauteYposition = oxo.animation.getPosition(astronaute).y;
  console.log("Astronaute position y: " + astronauteYposition + " limit: " + limitCalculate);
  return astronauteYposition >= limitCalculate;
}

function isBackgroundNotAtTheEnd() {
  return backgroundXPosition > 0
}

function isBackgroundAfterLimit() {
  return backgroundXPosition >= restartAstronauteToMoveFromBackground
}

function startEventListenerOnKeyPads(selectors) {
  
  oxo.inputs.listenKey('right', function () {
    console.log("right");
    oxo.animation.move(selectors.astronaute, 'right', stepAstronauteMove);
  });

  oxo.inputs.listenKey('left', function () {
    console.log("left");
    oxo.animation.move(selectors.astronaute, 'left', stepAstronauteMove);
  });

  oxo.inputs.listenKey('up', function () {
    console.log("up");
    console.log("is the astronaute reach the limit VP ? => " + isAstronauteAtVPLimit(selectors.astronaute));
    
    // with extra
    // if (isAstronauteAtVPLimit(selectors.astronaute) == false) {
    //   oxo.animation.move(selectors.astronaute, 'right', stepAstronauteMove);
    // } else if (isBackgroundAfterLimit() == true) {
    //   oxo.animation.move(selectors.astronaute, 'right', stepAstronauteMove);
    //   console.log(selectors.background.style.backgroundPositionX);
    // } else {
    //   backgroundXPosition += stepBackgroundMove;
    //   selectors.background.style.backgroundPositionX = backgroundXPosition * -1 + "px";
    //   console.log(selectors.background.style.backgroundPositionX);
    // }


    if (isAstronauteAtVPLimit(selectors.astronaute) == false) {
      oxo.animation.move(selectors.astronaute, 'up', stepAstronauteMove);
    } else {
      backgroundYPosition += stepBackgroundMove;
      selectors.background.style.backgroundPositionY = backgroundYPosition * -1 + "px";
      console.log(selectors.background.style.backgroundPositionY);
    }
  });

  oxo.inputs.listenKey('down', function () {
    console.log("down");

    if (isBackgroundNotAtTheEnd() == true) {
      backgroundYPosition -= stepBackgroundMove;
      selectors.background.style.backgroundPositionY = backgroundYPosition * -1 + "px";
      console.log(selectors.background.style.backgroundPositionY);
    } else {
      astronauteYOffset -= stepAstronauteMove;
      oxo.animation.move(selectors.astronaute, 'down', stepAstronauteMove);
    }
  });
}




// Start
launchIntro()



/*

// Constant
const viewportWidth = window.innerWidth; 
const viewportHeight = window.innerHeight;
const stepAstronauteMove = 10;
const stepBackgroundMove = 100; 
const limitPercentageFirstVP = 0.5;
const restartAstronauteToMoveFromBackground = 5000;


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

    // Init backgroundPositionX to 0px
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

function isBackgroundAfterLimit() {
  return backgroundXPosition >= restartAstronauteToMoveFromBackground
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
    
    // with extra
    // if (isAstronauteAtVPLimit(selectors.astronaute) == false) {
    //   oxo.animation.move(selectors.astronaute, 'right', stepAstronauteMove);
    // } else if (isBackgroundAfterLimit() == true) {
    //   oxo.animation.move(selectors.astronaute, 'right', stepAstronauteMove);
    //   console.log(selectors.background.style.backgroundPositionX);
    // } else {
    //   backgroundXPosition += stepBackgroundMove;
    //   selectors.background.style.backgroundPositionX = backgroundXPosition * -1 + "px";
    //   console.log(selectors.background.style.backgroundPositionX);
    // }


    if (isAstronauteAtVPLimit(selectors.astronaute) == false) {
      oxo.animation.move(selectors.astronaute, 'right', stepAstronauteMove);
    } else {
      backgroundXPosition += stepBackgroundMove;
      selectors.background.style.backgroundPositionX = backgroundXPosition * -1 + "px";
      console.log(selectors.background.style.backgroundPositionX);
    }
  });

  oxo.inputs.listenKey('left', function () {
    console.log("left");

    if (isBackgroundNotAtTheEnd() == true) {
      backgroundXPosition -= stepBackgroundMove;
      selectors.background.style.backgroundPositionX = backgroundXPosition * -1 + "px";
      console.log(selectors.background.style.backgroundPositionX);
    } else {
      astronauteXOffset -= stepAstronauteMove;
      oxo.animation.move(selectors.astronaute, 'left', stepAstronauteMove);
    }
  });
}



// Start
launchIntro()

*/