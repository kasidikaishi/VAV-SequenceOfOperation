function temperatureChange() {
  let currentTContent = document.getElementById('current-temperature-number');
  let currentSAContent = document.getElementById('airflowSetpoint-number');
  let setupTContent = document.getElementById('temperature-setup-number');
  let changeTContent = document.getElementById('temperature-change');
  let changeTButton = document.getElementById('temperature-change-submit');
  let cooldownModeButton = document.getElementById("cooldown-mode");
  let warmupModeButton = document.getElementById("warmup-mode");
  let normalModeButton = document.getElementById("normal-mode");
  let reheatCoil = document.getElementById('reheat-coil');
  let damper = document.querySelector('.damper-container');
  let damperAngle = 0;
  let reheatCoilOpen = false;
  let cooldownMode = false;
  let warmupMode = false;
  let normalMode = false;

  let intervalID = setInterval(() => change(), 1000)

  changeTButton.addEventListener('click', () => {
    const value = changeTContent.value;
    setupTContent.innerText = `${value} F`;
    Ts = value;
    changeTContent.value = '';
    clearInterval(intervalID);
    intervalID = setInterval(() => change(), 1000);
  })

  cooldownModeButton.addEventListener('click', () => {
    cooldownMode = !cooldownMode;
    warmupMode = false;
    normalMode = false;
    warmupModeButton.style.backgroundColor = '';
    normalModeButton.style.backgroundColor = '';
    if (cooldownMode) {
      cooldownModeButton.style.backgroundColor = 'darkgrey';
    } else {
      cooldownModeButton.style.backgroundColor = '';
    }
  })

  warmupModeButton.addEventListener('click', () => {
    cooldownMode = false;
    warmupMode = !warmupMode;
    normalMode = false;
    cooldownModeButton.style.backgroundColor = '';
    normalModeButton.style.backgroundColor = '';
    if (warmupMode) {
      warmupModeButton.style.backgroundColor = 'darkgrey';
      clearInterval(intervalID);
      intervalID = setInterval(() => change(), 1000);
      currentSA = 800;
      damperAngle = currentSA * 0.1 + 10;
      damper.style.transform = `rotate(${damperAngle}deg)`;
      currentSAContent.innerText = currentSA;
      reheatCoilOpen = true;
      reheatCoil.style.backgroundColor = 'red';
    } else {
      warmupModeButton.style.backgroundColor = '';
    }
  })

  normalModeButton.addEventListener('click', () => {
    cooldownMode = false;
    warmupMode = false;
    normalMode = !normalMode;
    cooldownModeButton.style.backgroundColor = '';
    warmupModeButton.style.backgroundColor = '';
    if (normalMode) {
      normalModeButton.style.backgroundColor = 'darkgrey';
    } else {
      normalModeButton.style.backgroundColor = '';
    }
  })

  var getNumberContent = function(content) {
    const n = content.length;
    const stringContent = content.slice(0, n - 1);
    return Number(stringContent);
  }

  let Ts = getNumberContent(setupTContent.textContent);
  let currentT = getNumberContent(currentTContent.textContent);
  let currentSA = Number(currentSAContent.textContent);

  var reheatCoilChange = function() {
    reheatCoilOpen = currentT < Ts ? true : false;
    if (reheatCoilOpen) {
      reheatCoil.style.backgroundColor = 'red';
    } else {
      reheatCoil.style.backgroundColor = 'blue';
    }
  }

  var increaseSA = function() {
    currentSA = Math.min(currentSA + 10, 800);
    damperAngle = currentSA * 0.1 + 10;
    damper.style.transform = `rotate(${damperAngle}deg)`;
    currentT = currentT - 0.1;
    currentSAContent.innerText = currentSA;
    currentTContent.innerText = `${currentT.toFixed(1)} F`;
  }

  var decreaseSA = function() {
    if (currentSA === 200 && currentT < Ts) {
      reheatCoilChange();
    }
    currentSA = Math.max(currentSA - 10, 200);
    damperAngle = currentSA * 0.1 + 10;
    damper.style.transform = `rotate(${damperAngle}deg)`;
    currentT = currentT + 0.1;
    currentSAContent.innerText = currentSA;
    currentTContent.innerText = `${currentT.toFixed(1)} F`;
  }

  var increaseTem = function() {
    currentT = currentT + 0.1;
    currentTContent.innerText = `${currentT.toFixed(1)} F`;
  }

  var change = function() {
    if (warmupMode) {
      increaseTem();
    } else {
      if (Math.abs(currentT - Ts) < (1e-10)) {
        clearInterval(intervalID);
        console.log(`space T ${currentT.toFixed(1)} = Ts ${Ts}, current Airflow setpoint is ${currentSA}`)
      } else if (currentT > Ts) {
        if (reheatCoilOpen) {
          reheatCoilOpen = false;
          reheatCoil.style.backgroundColor = 'blue';
        }
        if (!reheatCoilOpen) {
          increaseSA()
        }
        console.log(`space T is ${currentT.toFixed(1)}, Airflow setpoint is increasing+++ ${currentSA}`);
      } else if (currentT < Ts) {
        decreaseSA();
        console.log(`space T is ${currentT.toFixed(1)}, Airflow setpoint is decreasing--- ${currentSA}`)
      }
    }
  }
}

temperatureChange();
