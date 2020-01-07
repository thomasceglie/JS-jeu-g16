function launchIntro() {
  oxo.screens.loadScreen('intro', function() {
    // intro.html is loaded
    // Selectors
    const buttonPlay = document.querySelector('button.start');

    buttonPlay.addEventListener('click', function () {
      launchGame()
    });
  });
}

function launchGame() {
  oxo.screens.loadScreen('game', function() {
    // game.html is loaded, do something
    // Selectors
    //code here
    alert("have fun");
  });
}

launchIntro()
