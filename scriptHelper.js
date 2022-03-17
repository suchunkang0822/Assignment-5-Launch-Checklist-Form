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

    list.style.visibility = 'visible'


    pilotStatus.innerHTML = "Pilot " + pilot + " is ready for launch"
    copilotStatus.innerHTML = "Co-pilot " + copilot + " is ready for launch"
    fuelStatus.innerHTML = "Fuel level high enough for launch"
    cargoStatus.innerHTML = "Cargo mass low enough for launch"


    if (fuelLevel < 10000 || cargoLevel > 10000) {

        launchStatus.innerHTML = "Shuttle Not Ready for Launch"
        launchStatus.style.color = 'rgb(199, 37, 78)'

        if (fuelLevel < 10000) {
            fuelStatus.innerHTML = "Fuel level too low for launch"
        } 
        if (cargoLevel > 10000){
            cargoStatus.innerHTML = "Cargo mass too heavy for launch"
        }

    } else {
        launchStatus.innerHTML = "Shuttle is Ready for Launch"
        launchStatus.style.color = 'rgb(65, 159, 106)'
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

// Used to concat all of the names of the
// field that may have a problem 
function strBuilder(obj, str) {
    if (str === "") {
        str += obj.name
    } else {
        str += `, ${obj.name}`
    }
    return str
}

// Checks if any of the input fields 
// and return an aray of strings input names 
function errorMsgBuilder(arr) {
    let empty = ""
    let shouldBeStr = ""
    let shouldBeNum = ""
    let errorMsg = ""

    for (let i = 0; i < arr.length; i++) {
        if (validateInput(arr[i].value) === "Empty") {
            empty = strBuilder(arr[i], empty)
        } else if (validateInput(arr[i].value) === "Is a Number") {
            if (arr[i].name == "pilotName" || arr[i].name == "copilotName") {
                shouldBeStr = strBuilder(arr[i], shouldBeStr)
            }
        } else {
            if (arr[i].name == "fuelLevel" || arr[i].name == "cargoMass") {
                shouldBeNum = strBuilder(arr[i], shouldBeNum)
            }
        }
    }

    if (empty) {
        empty += " should be filled"
        errorMsg += `${empty}\n`
    }
    if (shouldBeStr) {
        shouldBeStr += " should be in letters"
        errorMsg += `${shouldBeStr}\n`
    }
    if (shouldBeNum) {
        shouldBeNum += " should be in numbers"
        errorMsg += `${shouldBeNum}`
    }
    return errorMsg
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;

module.exports.errorMsgBuilder = errorMsgBuilder;
