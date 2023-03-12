function temperatureChange() {
  let currentTContent = document.getElementById('current-temperature-number');
  let currentSAContent = document.getElementById('airflowSetpoint-number');
  let setupTContent = document.getElementById('temperature-setup-number');
  let changeTContent = document.getElementById('temperature-change');
  let changeTButton = document.getElementById('temperature-change-submit');

  let intervalID = setInterval(() => change(), 1000)

  changeTButton.addEventListener('click', () => {
    const value = changeTContent.value;
    setupTContent.innerText = `${value} F`;
    Ts = value;
    changeTContent.value = '';
    clearInterval(intervalID);
    intervalID = setInterval(() => change(), 1000);
  })

  var getNumberContent = function(content) {
    const n = content.length;
    const stringContent = content.slice(0, n - 1);
    return Number(stringContent);
  }

  let Ts = getNumberContent(setupTContent.textContent);
  let currentT = getNumberContent(currentTContent.textContent);
  let currentSA = Number(currentSAContent.textContent);

  var increaseSA = function() {
    currentSA = currentSA + 10;
    currentT = currentT - 1;
    currentSAContent.innerText = currentSA;
    currentTContent.innerText = `${currentT} F`;
  }

  var decreaseSA = function() {
    currentSA = currentSA - 10;
    currentT = currentT + 1;
    currentSAContent.innerText = currentSA;
    currentTContent.innerText = `${currentT} F`;
  }

  var change = function() {
    if (currentT > Ts) {
      increaseSA();
      console.log(`space T is ${currentT}, Airflow setpoint is increasing+++ ${currentSA}`);
    } else if (currentT < Ts) {
      decreaseSA();
      console.log(`space T is ${currentT}, Airflow setpoint is decreasing--- ${currentSA}`)
    } else {
      clearInterval(intervalID);
      console.log(`space T ${currentT} = Ts ${Ts}, current Airflow setpoint is ${currentSA}`)
    }
  }

}

temperatureChange();
