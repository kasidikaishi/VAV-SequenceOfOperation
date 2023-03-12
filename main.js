function temperatureChange() {
  let currentTContent = document.getElementById('current-temperature-number');
  let currentSAContent = document.getElementById('airflowSetpoint-number');
  let setupTContent = document.getElementById('temperature-setup-number');
  let changeTContent = document.getElementById('temperature-change');
  let changeTButton = document.getElementById('temperature-change-submit');
  let damper = document.querySelector('.damper-container');
  let currentRotationAngle = 0;
  let intervalID = setInterval(() => change(), 1000)

  changeTButton.addEventListener('click', () => {
    const value = changeTContent.value;
    setupTContent.innerText = `${value} F`;
    Ts = value;
    changeTContent.value = '';
    clearInterval(intervalID);
    intervalID = setInterval(() => change(), 1000);
  })

  var pauseRotate = function() {
    damper.style.animationPlayState = 'paused';
    console.log('------------>', currentRotationAngle)
  }

  var toggleRotation = function(condition, direction) {
    if (condition) {
      let computedStyle = window.getComputedStyle(damper);
      let transform = computedStyle.getPropertyValue('transform');
      let values = transform.split('(')[1].split(')')[0].split(',');
      let a = values[0];
      let b = values[1];
      let damperAngle = Math.round(Math.atan2(b, a) * (180/Math.PI));
      if (direction === 'clockwise') {
        damper.style.animationDirection = 'normal';
        currentRotationAngle = damperAngle + 3;
      } else if (direction === 'counterclockwise') {
        damper.style.animationDirection = 'reverse';
        currentRotationAngle = damperAngle - 3;
      }
      if (currentRotationAngle >= 1 && currentRotationAngle <= 89) {
        damper.style.animationPlayState = 'running';
        damper.style.transform = `rotate(${currentRotationAngle}deg)`;
      } else {
        pauseRotate();
      }
    } else {
      pauseRotate();
    }
  }

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
    currentT = currentT - 1;
    currentSAContent.innerText = currentSA;
    currentTContent.innerText = `${currentT} F`;
  }

  var decreaseSA = function() {
    currentSA = Math.max(currentSA - 10, 200);
    currentT = currentT + 1;
    currentSAContent.innerText = currentSA;
    currentTContent.innerText = `${currentT} F`;
  }

  var change = function() {
    if (currentT > Ts) {
      increaseSA();
      toggleRotation(true, 'clockwise');
      console.log(`space T is ${currentT}, Airflow setpoint is increasing+++ ${currentSA}`);
    } else if (currentT < Ts) {
      decreaseSA();
      toggleRotation(true, 'counterclockwise');
      console.log(`space T is ${currentT}, Airflow setpoint is decreasing--- ${currentSA}`)
    } else {
      clearInterval(intervalID);
      toggleRotation(false)
      console.log(`space T ${currentT} = Ts ${Ts}, current Airflow setpoint is ${currentSA}`)
    }
  }

}

temperatureChange();
