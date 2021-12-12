// button.disabled = false
// inputField.addEventListener("keydown", function(e) {
//     let input = ""
//     input.concat(e.key)
//     console.log("Keyboard " + input)
//     if (inputField.value === "") {
//         button.style.background = "red"
//         button.disabled = false
//     }
// })

import { fetchKeys } from "../js/app"

function showPopup(event, code) {
    let button = document.getElementById("add_City")
    let dateInput = document.getElementById("trip_date")

    // var date = new Date();
    // date.setMonth(date.getMonth() - 1, 1);
    // $('#datepicker').datepicker({defaultDate: date});

    if (code === 1) {
        console.log("Event " + event)

        document.getElementsByClassName("modal-bg")[0].classList.add("bg-active")
        console.log("Button " + button.innerText)


    }
    if (code === 2) {
        console.log("Close")
        document.getElementsByClassName("modal-bg")[0].classList.remove("bg-active")

    }

    if (code === 3) {
        // let value = document.getElementById("modal-bg")
        console.log("Clicked addd trips")
        let inputField = document.getElementById("name")
            // dateInput.value = ""

        let result = document.getElementById("result")
        console.log("Data " + dateInput.value)
        if (inputField.value === "") {
            console.log("Date is empty")
            result.innerText = "You have to enter a city"
            result.style.marginBottom = "5px"
            result.style.color = "red"
        } else if (dateInput.value === "") {
            result.innerText = "You have to enter the travel date"
            result.style.marginBottom = "5px"
            result.style.color = "red"
        } else {
            var today = new Date()
            var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            console.log("Current date " + currentDate)
            console.log("Entered data " + dateInput.value)
            result.innerText = ''
            let url = 'http://localhost:8000/getAllKeys'
            let geoNamesURL = ""
            let results = getKeys(url)
            if (dateInput.value < currentDate) {
                console.log("The date is not proper")
                result.innerText = "The date is not proper, please choose future dates"
                result.style.marginBottom = "5px"
                result.style.color = "orange"
                return
            }
            results.then(function(data) {
                geoNamesURL = `http://api.geonames.org/searchJSON?q=${inputField.value}&paris&maxRows=10&username=${data.geo_userName}`
                console.log("The data we got " + (data.weatherKey))
                console.log("URL to visi " + geoNamesURL)
                let geoNameResult = getGeoName(geoNamesURL)
                geoNameResult.then(function(nameRecieved) {
                        if (nameRecieved.totalResultsCount === 0) {
                            result.innerText = "Could not find the destination, please try something else"
                            result.style.marginBottom = "5px"
                            result.style.color = "orange"
                        } else {
                            // Let's bring the other data
                            const city = nameRecieved.geonames[0].toponymName
                            const lat = nameRecieved.geonames[0].lat
                            const lng = nameRecieved.geonames[0].lng
                            const country = nameRecieved.geonames[0].countryName
                            console.log("City Found " + city)
                            console.log("Country Found " + country)
                            console.log("LAt Found " + lat)
                            console.log("Long Found " + lng)
                            let objectLocation = { city: city, lat: lat, lng: lng, country: country }
                            console.log("Objct Location " + objectLocation)
                        }
                    })
                    // validateDate()

            })
        }



        console.log(inputField.value)

    }

    function validateDate(data) {

    }
    async function getGeoName(url) {
        console.log("URL Passed " + url)
            // if (!validateLocalhost(url)) {
            //     console.log("Not valid url")
            //     return
            // }
        const response = await fetch(url);

        try {
            const newData = await response.json();
            // console.log("Data came " + JSON.stringify(newData))
            return newData
        } catch (error) {
            console.log("error", error);
            // appropriately handle the error
        }
        console.log("data passed " + JSON.stringify(data));

    }
}
async function getKeys(url) {
    console.log("URL Passed " + url)
        // if (!validateLocalhost(url)) {
        //     console.log("Not valid url")
        //     return
        // }
    const response = await fetch(url);

    try {
        const newData = await response.json();
        // console.log("Data came " + JSON.stringify(newData))
        return newData
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
    console.log("data passed " + JSON.stringify(data));

}





export { showPopup }