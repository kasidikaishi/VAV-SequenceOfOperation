function temperatureChange() {
  let currentTContent = document.getElementById('current-temperature-number');
  let currentSAContent = document.getElementById('airflowSetpoint-number');
  let setupTContent = document.getElementById('temperature-setup-number');
  let changeTContent = document.getElementById('temperature-change');
  let changeTButton = document.getElementById('temperature-change-submit');
  let damper = document.querySelector('.damper-container');
  let damperPausedAngle = null;

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
    let computedStyle = window.getComputedStyle(damper);
    let transform = computedStyle.getPropertyValue('transform');
    let values = transform.split('(')[1].split(')')[0].split(',');
    let a = values[0];
    let b = values[1];
    damperPausedAngle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    // damper.style.transform = `rotate(${damperPausedAngle}deg)`;
    console.log('---->paused angle is', damperPausedAngle, damper.style.transform);
  }

  var toggleRotation = function(condition, direction) {
    if (condition) {
      let computedStyle = window.getComputedStyle(damper);
      let transform = computedStyle.getPropertyValue('transform');
      let values = transform.split('(')[1].split(')')[0].split(',');
      let a = values[0];
      let b = values[1];
      let damperAngle = Math.round(Math.atan2(b, a) * (180/Math.PI));
      damperPausedAngle = damperAngle;
      console.log('......', direction, damperAngle)
      if (direction === 'clockwise') {
        damper.style.animationDirection = 'normal';
        if (damperAngle === 90) {
          pauseRotate();
        } else {
          damper.style.animationPlayState = 'running';
        }
      } else if (direction === 'counterclockwise') {
        damper.style.animationDirection = 'reverse';
        if (damperAngle === 0) {
          pauseRotate();
        } else {
          damper.style.animationPlayState = 'running';
        }
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
