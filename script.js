// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

window.onload = (event) => {
  let pilotName = document.getElementById('pilotName');
  let coPilotName = document.getElementById('coPilotName');
  let fuelLevel = document.getElementById('fuelLevel');
  let cargoMass = document.getElementById('cargoMass');
  let pilotStatus = document.getElementById('pilotStatus');
  let fuelStatus = document.getElementById('fuelStatus');
  let copilotStatus = document.getElementById('copilotStatus');
  let cargoStatus = document.getElementById('cargoStatus');
  let missionTarget = document.getElementById('missionTarget');
  let faultyItems = document.getElementById('faultyItems');
  let launchStatus = document.getElementById('launchStatus');

  fetch('https://handlers.education.launchcode.org/static/planets.json')
    .then((response) => response.json())
    .then((data) => {
      let ranNum = Math.floor(Math.random() * data.length);
      missionTarget.innerHTML = `<h2>Mission Destination</h2>
          <ol>
            <li>Name: ${data[ranNum].name}</li>
            <li>Diameter: ${data[ranNum].diameter}</li>
            <li>Star: ${data[ranNum].star}</li>
            <li>Distance from Earth: ${data[ranNum].distance}</li>
            <li>Number of Moons: ${data[ranNum].moons}</li>
          </ol>
          <img src="${data[ranNum].image}">`;
    });

  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    let inputArr = document.getElementsByTagName('input');
    inputArr = Array.from(inputArr);
    faultyItems.style.visibility = 'visible';
    let isReady = false;
    inputArr.forEach((x) => {
      isReady = false;
      switch (x.id) {
        case 'pilotName':
          if (x.value == '') {
            alert('Please enter a pilot name.');
            pilotStatus.innerHTML = 'Pilot not ready.';
          } else {
            pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch.`;
            isReady = true;
          }
          break;
        case 'coPilotName':
          if (x.value == '') {
            alert('Please enter a co pilot name.');
            copilotStatus.innerHTML = 'Co-pilot not ready';
            isReady = false;
          } else {
            copilotStatus.innerHTML = `Pilot ${coPilotName.value} is ready for launch.`;
            isReady = true;
          }
          break;
        case 'fuelLevel':
          if (x.value == '' || isNaN(x.value)) {
            alert('Please enter a valid number for fuel level');
            fuelStatus.innerHTML = 'No fuel level provided.';
            isReady = false;
          } else if (Number(x.value) < 10000) {
            fuelStatus.innerHTML = 'Fuel too low for launch';
            isReady = false;
          } else {
            fuelStatus.innerHTML = 'Fuel level high enough for launch';
            isReady = true;
          }
          break;
        case 'cargoMass':
          if (x.value == '' || isNaN(x.value)) {
            alert('Please enter a valid number for cargo Mass.');
            cargoStatus.innerHTML = 'No cargo mass provided';
            isReady = false;
          } else if (Number(x.value) > 10000) {
            console.log('cargo high');
            cargoStatus.innerHTML = 'Cargo too high for launch';
            isReady = false;
          } else {
            cargoStatus.innerHTML = 'Cargo mass low enough for launch';
            isReady = true;
          }
          break;
      }
    });

    if (
      pilotName.value !== '' &&
      coPilotName.value !== '' &&
      Number(fuelLevel.value) > 10000 &&
      Number(cargoMass.value) < 10000
    ) {
      launchStatus.innerHTML = 'Shuttle Ready for Launch';
      launchStatus.style.color = 'green';
    } else {
      launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
      launchStatus.style.color = 'red';
    }
  });
};
