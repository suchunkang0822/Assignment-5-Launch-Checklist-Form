// Write your JavaScript code here!
// const { pickPlanet, addDestinationInfo } = require("./scriptHelper");

window.addEventListener("load", function () {



    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        //    console.log(listedPlanets);

    }).then(function () {
        //    console.log(listedPlanets);
        //    Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let planet = pickPlanet(listedPlanets)
        addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image)



        let form = this.document.querySelector("form")
        form.addEventListener("submit", e => {

            let list = this.document.getElementById('faultyItems')
            let pilotName = this.document.querySelector('input[name=pilotName]')
            let copilotName = this.document.querySelector('input[name=copilotName]')
            let fuelLevel = this.document.querySelector('input[name=fuelLevel]')
            let cargoMass = this.document.querySelector('input[name=cargoMass]')

            let input = [pilotName, copilotName, fuelLevel, cargoMass]

            let error = errorMsgBuilder(input)




            // Checks if there are any input errors  
            if (error) {
                this.alert(error)
                e.preventDefault()
            } else {
                formSubmission(document, list, pilotName.value, copilotName.value, fuelLevel.value, cargoMass.value)
                e.preventDefault()
            }

        })



    })
});





function pickPlanet(planets) {
    let randomNum = Math.floor(Math.random() * planets.length)
    return planets[randomNum]
}

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