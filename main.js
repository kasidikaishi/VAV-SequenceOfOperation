function temperatureChange() {
  let currentTContent = document.getElementById('current-temperature-number');
  let currentSAContent = document.getElementById('airflowSetpoint-number');
  let setupTContent = document.getElementById('temperature-setup-number');
  let changeTContent = document.getElementById('temperature-change');
  let changeTButton = document.getElementById('temperature-change-submit');
  let damper = document.querySelector('.damper-container');
  let damperAngle = 0;

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
    currentSA = Math.min(currentSA + 10, 800);
    damperAngle = currentSA * 0.1 + 10;
    damper.style.transform = `rotate(${damperAngle}deg)`;
    currentT = currentT - 0.1;
    currentSAContent.innerText = currentSA;
    currentTContent.innerText = `${currentT.toFixed(1)} F`;

  }

  var decreaseSA = function() {
    currentSA = Math.max(currentSA - 10, 200);
    damperAngle = currentSA * 0.1 + 10;
    damper.style.transform = `rotate(${damperAngle}deg)`;
    currentT = currentT + 0.1;
    currentSAContent.innerText = currentSA;
    currentTContent.innerText = `${currentT.toFixed(1)} F`;
  }

  var change = function() {
    if (Math.abs(currentT - Ts) < (1e-10)) {
      clearInterval(intervalID);
      console.log(`space T ${currentT.toFixed(1)} = Ts ${Ts}, current Airflow setpoint is ${currentSA}`)
    } else if (currentT > Ts) {
      increaseSA();
      console.log(`space T is ${currentT.toFixed(1)}, Airflow setpoint is increasing+++ ${currentSA}`);
    } else if (currentT < Ts) {
      decreaseSA();
      console.log(`space T is ${currentT.toFixed(1)}, Airflow setpoint is decreasing--- ${currentSA}`)
    }
  }
}

temperatureChange();
