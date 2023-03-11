var temperatureChange = function(currentT, Ts, currentSA) {
  // let currentT = T;
  // let currentSA = SA;

  var increaseSA = function() {
    currentSA = currentSA + 10;
    currentT = currentT - 0.5;
    console.log(`SA is increasing: ${currentSA}`)
    console.log(`current temperature T: ${currentT.toFixed(1)}`);
  }

  var decreaseSA = function() {
    currentSA = currentSA - 10;
    currentT = currentT + 0.5;
    console.log(`SA is decreasing: ${currentSA}`)
    console.log(`current temperature T: ${currentT.toFixed(1)}`);
  }

  let intervalID = setInterval(() => {
    if (currentT > Ts) {
      increaseSA();
    } else if (currentT < Ts) {
      decreaseSA();
    } else {
      clearInterval(intervalID);
      console.log(`current T is ${currentT}, equal to Ts ${Ts}, current SA is ${currentSA}`)
    }
  }, 1000)
}

temperatureChange(35, 32, 400);
console.log('...')
// temperatureChange(32, 36, 460);
