// Constant

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;
const stepAstronauteMove = 15;
const stepBackgroundMove = 80;
const limitPercentageFirstVP = 0.5;
const numberOfFireTakenForVictory = 3;
const soundPlayer = new Audio("http://sentiany.fr/backgroundMusic.ogg");

// const obstacleGeneratedScenarioListSatelite = [
//   [{
//     "type": "fire",
//     "translateX": 500
//   }]
// ];

const obstacleGeneratedScenarioList = [
  [{
    "type": "fire",
    "translateX": 800
  }, {
    "type": "fire",
    "translateX": 500
  }, {
    "type": "fireball",
    "translateX": 430
  }],
  [{
    "type": "fire",
    "translateX": 700
  }, {
    "type": "fireball",
    "translateX": 500
  }],
  [{
    "type": "fire",
    "translateX": 430
  }, {
    "type": "fireball",
    "translateX": 750
  }],
  [{
    "type": "fireball",
    "translateX": 800
  }, {
    "type": "fire",
    "translateX": 500
  }, {
    "type": "fire",
    "translateX": 430
  }, {
    "type": "fire",
    "translateX": 500
  }],
  [{
    "type": "fire",
    "translateX": 650
  }, {
    "type": "fire",
    "translateX": 450
  }, {
    "type": "fireball",
    "translateX": 530
  }, {
    "type": "fire",
    "translateX": 780
  }, {
    "type": "fireball",
    "translateX": 600
  }],
  [{
    "type": "fireball",
    "translateX": 600
  }, {
    "type": "fireball",
    "translateX": 720
  }, {
    "type": "fire",
    "translateX": 460
  }, {
    "type": "fireball",
    "translateX": 800
  }],
  [{
    "type": "fireball",
    "translateX": 740
  }, {
    "type": "fire",
    "translateX": 500
  }, {
    "type": "fireball",
    "translateX": 430
  }, {
    "type": "fire",
    "translateX": 800
  }, {
    "type": "fireball",
    "translateX": 590
  }]
];

const obstacleGeneratedScenarioListSatelite = [
  [{
    "type": "satelite",
    "translateX": 330
  }, {
    "type": "satelite",
    "translateX": 900
  }, {
    "type": "satelite",
    "translateX": 180
  }],
  [{
    "type": "satelite",
    "translateX": 900
  }, {
    "type": "satelite",
    "translateX": 500
  }],
  [{
    "type": "satelite",
    "translateX": 430
  }, {
    "type": "satelite",
    "translateX": 750
  }],
  [{
    "type": "satelite",
    "translateX": 750
  }, {
    "type": "satelite",
    "translateX": 900
  }, {
    "type": "satelite",
    "translateX": 230
  }, {
    "type": "satelite",
    "translateX": 400
  }],
  [{
    "type": "satelite",
    "translateX": 950
  }, {
    "type": "satelite",
    "translateX": 350
  }, {
    "type": "satelite",
    "translateX": 280
  }, {
    "type": "satelite",
    "translateX": 780
  }, {
    "type": "satelite",
    "translateX": 600
  }],
  [{
    "type": "satelite",
    "translateX": 950
  }, {
    "type": "satelite",
    "translateX": 820
  }, {
    "type": "satelite",
    "translateX": 300
  }, {
    "type": "satelite",
    "translateX": 500
  }],
  [{
    "type": "satelite",
    "translateX": 550
  }, {
    "type": "satelite",
    "translateX": 200
  }, {
    "type": "satelite",
    "translateX": 830
  }, {
    "type": "satelite",
    "translateX": 750
  }, {
    "type": "satelite",
    "translateX": 1000
  }]
];



let obstacleGeneratedList = [];
let obstacleGeneratedListSatelite = [];

function createObstacle(type, translateX, astronaute) {
  let obstacle = oxo.elements.createElement({
    type: 'div',
    class: 'obstacle ' + type,
    obstacle: false,
    styles: {
      transform: 'translateX(' + translateX + 'px)'
    },
    appendTo: 'body'
  });
  //debugger
  oxo.elements.onCollisionWithElementOnce(obstacle, astronaute, function () {
    if (type === 'fireball' || type == 'satelite') {
      launchgameover();
      //debugger

    } else if (type === 'fire') {
      console.log(document.querySelector("div.countFire1"))
      console.log(document.querySelector("div.countFire2"))
      console.log(document.querySelector("div.countFire3"))

      obstacle.remove();
      oxo.player.addToScore(1)

      console.log("div.countFire" + oxo.player.getScore())
      let counterFire = document.querySelector("div.countFire" + oxo.player.getScore());
      counterFire.style.opacity = 1;

      //if (oxo.player.getScore() == numberOfFireTakenForVictory) {
      //  oxo.screens.loadScreen('screen-win', function () { });
      //}
    }
  });

  const cleanZone = document.querySelector("div.cleanZone")
  oxo.elements.onCollisionWithElementOnce(cleanZone, obstacle, function () {
    obstacle.remove();
  });

  return obstacle
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


function launchhome() {
  oxo.screens.loadScreen('home', function () {
    const buttonStartIntro = document.querySelector('button.play__button');
    buttonStartIntro.addEventListener('click', function () {
      launchIntro()
    });
  });
}

function launchIntro() {
  oxo.screens.loadScreen('intro', function () {
    const buttonPlay = document.querySelector('button.page__button');
    buttonPlay.addEventListener('click', function () {
      launchLoader()
    });
  });
}

function launchgameover() {
  oxo.screens.loadScreen('game-over', function () {
    soundPlayer.pause();
    const buttonRestartTheGame = document.querySelector('button.button-restart');
    buttonRestartTheGame.addEventListener('click', function () {
      launchLoader()
    });
  });
}

function launchscreenwin() {
  oxo.screens.loadScreen('screen-win', function () {
    soundPlayer.pause();
    const buttonPlayAgain = document.querySelector('button.again');
    buttonPlayAgain.addEventListener('click', function () {
      launchIntro()
    });
  });
}

function isRandomTranslateXAlreadySet(newRandomTransform) {
  let isAlreadySet = false
  fireballGeneratedlist.forEach(function (fireball) {
    let fireballTranform = fireball.style.transform
    if (fireballTranform == newRandomTransform) {
      isAlreadySet = true
    }
  });

  return isAlreadySet;
}

function playSound() {
  soundPlayer.play();
}

function generateObstacleLine(astronaute, shouldGenerateSatelite) {

  if (shouldGenerateSatelite) {
    let indexRandom = getRandomInt(0, obstacleGeneratedScenarioListSatelite.length - 1);
    console.log("scenario index choose " + indexRandom);
    let scenarioChooseWithObstacleListSatelite = obstacleGeneratedScenarioListSatelite[indexRandom];
    console.log("scenarioChooseWithObstacleListSatelite", scenarioChooseWithObstacleListSatelite)
    scenarioChooseWithObstacleListSatelite.forEach(function (obstacleInfo) {
      obstacleGeneratedListSatelite.push(createObstacle(obstacleInfo.type, obstacleInfo.translateX, astronaute))
    })
  } else {
    let indexRandom = getRandomInt(0, obstacleGeneratedScenarioList.length - 1);
    console.log("scenario index choose " + indexRandom);
  
    let scenarioChooseWithObstacleList = obstacleGeneratedScenarioList[indexRandom];
    console.log("scenarioChooseWithObstacleList", scenarioChooseWithObstacleList)
    scenarioChooseWithObstacleList.forEach(function (obstacleInfo) {
      obstacleGeneratedList.push(createObstacle(obstacleInfo.type, obstacleInfo.translateX, astronaute))
    })
  }
}
function launchGame() {
  playSound();
  const selectors = {
    "astronaute": document.querySelector("div.astronaute"),
    "background": document.querySelector("body.game")
  };



  // Init backgroundPositionY to the end minus viewport
  backgroundYPosition = 800;
  selectors.background.style.backgroundPositionY = backgroundYPosition + "px";

  // Init positin astronaute
  oxo.animation.setPosition(selectors.astronaute, { x: 600, y: 400 });

  startEventListenerOnKeyPads(selectors);

  //generateObstacleLine(selectors.astronaute);

  let obstacleInterval = setInterval(function () {
    generateObstacleLine(selectors.astronaute, false);
    setInterval(function () {
      obstacleGeneratedList.forEach(function (obstacle) {
        //console.log(obstacle);
        oxo.animation.move(obstacle, 'down', 20);
      })
    }, 300);
  }, 8000)


  // when reach on top
  setTimeout(function () {
    launchscreenwin()
  }, 59500);



  // remove after the the exit of vulcain
  setTimeout(function () {
    console.log("Disabled obstacle fireball + fire")
    clearInterval(obstacleInterval);
    let allObstacle = document.querySelectorAll("div.obstacle");
    allObstacle.forEach(function (obstacle) {
      obstacle.remove();
    })

    console.log("setTimeout 8s")
    setTimeout(function () {
      console.log("enabled obstacle satelite");
      let obstacleInterval = setInterval(function () {
        generateObstacleLine(selectors.astronaute, true);
        setInterval(function () {
          obstacleGeneratedListSatelite.forEach(function (obstacle) {
            //console.log(obstacle);
            oxo.animation.move(obstacle, 'down', 20);
          })
        }, 450);
      }, 8000)
    }, 1000);


  }, 26500);

  // clean obstacle
  let cleanZone = oxo.elements.createElement({
    type: 'div',
    class: 'cleanZone',
    obstacle: false,
    styles: {
      transform: 'translate(0px, 99%)'
    },
    appendTo: 'body'
  });
}

function launchLoader() {
  oxo.screens.loadScreen('game', function () {
    let loaderOverlay = document.querySelector("div.loaderOverlay");
    let countdownLabel = loaderOverlay.querySelector("h1");
    let countdown = 3
    let setIntervalCountdown = setInterval(function () {
      countdownLabel.innerText = countdown
      countdown -= 1;
      if (countdown == -1) {
        clearInterval(setIntervalCountdown);
      }
    }, 500);
    let timeout = setTimeout(function () {
      launchGame();
      loaderOverlay.classList.add('hidden');
      clearTimeout(timeout);
    }, 3000);
    
  
  });
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
    oxo.animation.move(selectors.astronaute, 'up', stepAstronauteMove);

  });

  oxo.inputs.listenKey('down', function () {
    console.log("down");
    oxo.animation.move(selectors.astronaute, 'down', stepAstronauteMove);

  });

}


launchhome()


// CODE TO GENERATE RANDOM KEYS ARROWS   

// function startEventListenerOnKeyPads(selectors) {
//   function shuffle(array) {
//     array.sort(() => Math.random() - 0.5);
// }

// let a = 'up';
// let b = 'down';
// let c = 'left';
// let d = 'right';


// let KeyDirection = [a, b, c, d];

// shuffle(KeyDirection);
// console.log(KeyDirection);

// var up = KeyDirection[0];
// var down = KeyDirection[1];
// var left = KeyDirection[2];
// var right = KeyDirection[3];

// console.log(up, down, left, right);


//   oxo.inputs.listenKey("right", function () {
//     console.log("right");
//     oxo.animation.move(selectors.astronaute, right, stepAstronauteMove);
//   });

//   oxo.inputs.listenKey("left", function () {
//     console.log("left");
//     oxo.animation.move(selectors.astronaute, left, stepAstronauteMove);
//   });
//   oxo.inputs.listenKey("up", function () {
//     console.log("up");
//     oxo.animation.move(selectors.astronaute, up, stepAstronauteMove);

//   });

//   oxo.inputs.listenKey("down", function () {
//     console.log("down");
//     oxo.animation.move(selectors.astronaute, down, stepAstronauteMove);
//   });

// }
// launchhome()
