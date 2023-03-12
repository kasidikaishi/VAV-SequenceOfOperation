function temperatureChange() {
  let currentTContent = document.getElementById('current-temperature-number');
  let currentSAContent = document.getElementById('airflowSetpoint-number');
  let setupTContent = document.getElementById('temperature-setup-number');
  let changeTContent = document.getElementById('temperature-change');
  let changeTButton = document.getElementById('temperature-change-submit');
  let Ts;

  let intervalID = setInterval(() => change(), 1000)

  changeTButton.addEventListener('click', () => {
    const value = changeTContent.value;
    setupTContent.innerText = `${value} F`;
    Ts = value;
    changeTContent.value = '';
    clearInterval(intervalID);
    intervalID = setInterval(() => change(), 1000);
  })

  let currentT = Number(currentTContent.textContent);
  let currentSA = Number(currentSAContent.textContent);

  var increaseSA = function() {
    currentSA = currentSA + 10;
    currentT = currentT - 1;
    currentSAContent.innerText = currentSA;
    currentTContent.innerText = currentT;
  }

  var decreaseSA = function() {
    currentSA = currentSA - 10;
    currentT = currentT + 1;
    currentSAContent.innerText = currentSA;
    currentTContent.innerText = currentT;
  }

  var change = function() {
    if (Ts) {
      if (currentT > Ts) {
        increaseSA();
      } else if (currentT < Ts) {
        decreaseSA();
      } else {
        clearInterval(intervalID);
        console.log(`current T is ${currentT}, equal to Ts ${Ts}, current SA is ${currentSA}`)
      }
    }
  }

}

temperatureChange();
