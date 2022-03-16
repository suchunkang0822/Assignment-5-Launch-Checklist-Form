// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    let missionTarget = document.getElementById('missionTarget')
    missionTarget.innerHTML =
        `<h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name}</li>
                     <li>Diameter: ${diameter}</li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance}</li>
                     <li>Number of Moons: ${moons}</li>
                 </ol>
                 <img src=${imageUrl}>`
}

function validateInput(testInput) {
    if (testInput === "") {
        return "Empty"
    } else if (typeof parseInt(testInput) === "number" && /^\d+$/.test(testInput)) {
        return "Is a Number"
    } else if (/^[A-Za-z\s]*$/.test(testInput)) {
        return "Not a Number"
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {

    let launchStatus = document.getElementById('launchStatus')
    let pilotStatus = document.getElementById("pilotStatus")
    let copilotStatus = document.getElementById("copilotStatus")
    let fuelStatus = document.getElementById('fuelStatus')
    let cargoStatus = document.getElementById('cargoStatus')



    pilotStatus.innerHTML = "Pilot " + pilot + " ready for launch"
    copilotStatus.innerHTML = "Co-pilot " + copilot + " ready launch"


    if (fuelLevel < 10000 || cargoLevel > 10000) {
        launchStatus.innerHTML = "Shuttle not ready for launch"
        launchStatus.style.color = 'red'

        if (fuelLevel < 10000) {
            list.style.visibility = 'visible'
            fuelStatus.innerHTML = "Fuel level too low for launch"
        } else {
            list.style.visibility = 'visible'
            cargoStatus.innerHTML = "Cargo mass too high for launch"
        }

    } else {
        launchStatus.innerHTML = "Shuttle ready for launch"
        launchStatus.style.color = 'green'
    }


}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json")
    .then( function(response) {
        return response.json()
    });
    return planetsReturned;
}

function pickPlanet(planets) {
    let randomNum = Math.floor(Math.random() * planets.length)
    return planets[randomNum]
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
