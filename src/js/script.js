
//oxo.screens.loadScreen('game-over');
// Constant

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;
const stepAstronauteMove = 15;
const stepBackgroundMove = 80;
const limitPercentageFirstVP = 0.5;
const numberOfFireTakenForVictory = 3;


// const obstacleGeneratedScenarioList = [
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

/*
const obstacleGeneratedScenarioListSatelite = [
  [{
    "type": "satelite",
    "translateX": 800
  }, {
    "type": "satelite",
    "translateX": 500
  }, {
    "type": "satelite",
    "translateX": 430
  }],
  [{
    "type": "satelite",
    "translateX": 700
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
    "translateX": 800
  }, {
    "type": "satelite",
    "translateX": 500
  }, {
    "type": "satelite",
    "translateX": 430
  }, {
    "type": "satelite",
    "translateX": 500
  }],
  [{
    "type": "satelite",
    "translateX": 650
  }, {
    "type": "satelite",
    "translateX": 450
  }, {
    "type": "satelite",
    "translateX": 530
  }, {
    "type": "satelite",
    "translateX": 780
  }, {
    "type": "satelite",
    "translateX": 600
  }],
  [{
    "type": "satelite",
    "translateX": 600
  }, {
    "type": "satelite",
    "translateX": 720
  }, {
    "type": "satelite",
    "translateX": 460
  }, {
    "type": "satelite",
    "translateX": 800
  }],
  [{
    "type": "satelite",
    "translateX": 740
  }, {
    "type": "satelite",
    "translateX": 500
  }, {
    "type": "satelite",
    "translateX": 430
  }, {
    "type": "satelite",
    "translateX": 800
  }, {
    "type": "satelite",
    "translateX": 590
  }]
];

*/


let obstacleGeneratedList = []
//let obstacleGeneratedListSatelite = []

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

  oxo.elements.onCollisionWithElementOnce(obstacle, astronaute, function () {
    if (type === 'fireball' && 'satelite') {
      launchgameover()
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
      launchGame()
    });
  });
}

function launchgameover() {
  oxo.screens.loadScreen('game-over', function () {
    const buttonRestartTheGame = document.querySelector('button.button-restart');
    buttonRestartTheGame.addEventListener('click', function () {
      launchGame()
    });
  });
}

function launchscreenwin() {
  oxo.screens.loadScreen('screen-win', function () {
    const buttonPlayAgain = document.querySelector('button.again');
    buttonPlayAgain.addEventListener('click', function () {
      launchhome()
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

function generateObstacleLine(astronaute) {
  let indexRandom = getRandomInt(0, obstacleGeneratedScenarioList.length - 1);
  console.log("scenario index choose " + indexRandom);

  let scenarioChooseWithObstacleList = obstacleGeneratedScenarioList[indexRandom];
  console.log("scenarioChooseWithObstacleList",scenarioChooseWithObstacleList)
  scenarioChooseWithObstacleList.forEach(function (obstacleInfo) {
    obstacleGeneratedList.push(createObstacle(obstacleInfo.type, obstacleInfo.translateX, astronaute))
  })

  setInterval(function () {
    obstacleGeneratedList.forEach(function (obstacle) {
      //console.log(obstacle);
      oxo.animation.move(obstacle, 'down', 20);
    })
  }, 200);
}

function launchGame() {
  oxo.screens.loadScreen('game', function () {

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
      generateObstacleLine(selectors.astronaute);
    }, 8000)
      
    
    // when reach on top
    setTimeout(function () {
      oxo.screens.loadScreen('screen-win', function () {})
    }, 37000);
    


    // remove after the the exit of vulcain
      setTimeout(function () {

      clearInterval(obstacleInterval);
      let allObstacle = document.querySelectorAll("div.obstacle");
      allObstacle.forEach(function (obstacle) {
        obstacle.remove();
      })
    }, 29600);

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
