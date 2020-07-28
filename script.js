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
    if (pilotName.value == '') {
      alert('Please enter a pilot name');
    } else if (coPilotName.value == '') {
      alert('Please enter a co-pilot name');
    } else if (fuelLevel.value == '') {
      alert('Please enter a fuel level');
    } else if (isNaN(fuelLevel.value)) {
      alert('Please enter a number value for fuel level');
    } else if (cargoMass.value == '') {
      alert('Please enter a cargo mass.');
    } else if (isNaN(fuelLevel.value)) {
      alert('Please enter a number value for cargo mass');
    } else {
      pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch`;
      copilotStatus.innerHTML = `Co-pilot ${coPilotName.value} is ready for launch`;
      if (Number(fuelLevel.value) < 10000) {
        launchStatus.style.color = 'red';
        launchStatus.innerHTML = 'Shuttle not ready for launch';
        faultyItems.style.visibility = 'visible';
        fuelStatus.innerHTML = `Fuel level is too low to complete journey.`;
      }
      if (Number(cargoMass.value) > 10000) {
        launchStatus.style.color = 'red';
        launchStatus.innerHTML = 'Shuttle not ready for launch';
        faultyItems.style.visibility = 'visible';
        cargoStatus.innerHTML = `Cargo mass too high for launch.`;
      }

      if (Number(cargoMass.value < 1000) && Number(fuelLevel.value) > 10000) {
        launchStatus.style.color = 'green';
        launchStatus.innerHTML = 'Shuttle ready for launch';
        faultyItems.style.visibility = 'visible';
        cargoStatus.innerHTML = `Cargo mass low enough for launch.`;
        fuelStatus.innerHTML = `Fuel level high enough for launch`;
      }
    }
  });
};

// Your info box does not populate with the information on the shuttle if everything passes
// The fetch does not populate until the submit button is hit
