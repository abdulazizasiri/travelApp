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
import { validURL, validateLocalhost } from '../js/urlChecker'

import { fetchData } from "../js/app"

function showPopup(event, code) {
    let button = document.getElementById("add_City")
    let dateInput = document.getElementById("trip_date")
    let currentData = -1
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
        let daysDiff = -1
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

            var checkCurrent = today.getFullYear() + '-' + today.getDate() + '-' + (today.getMonth() + 1);

            var currentDate = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();

            var enteredDate = new Date(dateInput.value)
                // console.log("Entered date " + enteredDate)
            let formedDate = (enteredDate.getMonth() + 1) + '/' + enteredDate.getDate() + '/' + enteredDate.getFullYear();
            console.log("Entered date " + formedDate)
            console.log("My date " + currentDate)
            console.log("Type " + typeof formedDate)
            console.log("Type 2 " + typeof currentDate)
            const date1 = new Date(currentDate);
            const date2 = new Date(enteredDate);
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            console.log(diffTime + " milliseconds");
            console.log(diffDays + " days");
            daysDiff = diffDays

            result.innerText = ''
            let url = 'http://localhost:8000/getAllKeys'
            if (!validateLocalhost(url)) {
                console.log("Ivalid url")
                return
            }
            let geoNamesURL = ""
            let results = getKeys(url)
                // var inputDate = new Date()
            if (enteredDate.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) {
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
                        const city = nameRecieved.geonames[0].toponymName
                        const lat = nameRecieved.geonames[0].lat
                        const lng = nameRecieved.geonames[0].lng
                        const country = nameRecieved.geonames[0].countryName
                        console.log("City Found " + city)
                        console.log("Country Found " + country)
                        console.log("LAt Found " + lat)
                        console.log("Long Found " + lng)

                        let uniqId = 'id' + (new Date()).getTime();
                        console.log("UNIQUE IDDD " + uniqId)
                        let objectLocation = { id: uniqId, tripDate: formedDate, city: city, lat: lat, lng: lng, country: country, imageKey: data.pixabay_key, weatherKey: data.weather_key, dayasDiff: daysDiff }

                        let imageResult = getImageRelated(city, data.pixabay_key) //
                        imageResult.then(function(dataImage) {
                            objectLocation.imageURL = dataImage.hits[0].webformatURL

                        })
                        let tempResult = getWeatherInfoRelated(lat, lng, data.weather_key)
                        tempResult.then(function(weatherData) {

                            objectLocation.tripNewWeatherMax = weatherData.data[0].app_max_temp
                            objectLocation.tripNewWeatherMin = weatherData.data[0].app_min_temp

                            objectLocation.weatherDescription = weatherData.data[0].weather.description

                            let result = postData(objectLocation);
                            result.then(function(data) {
                                console.log("DATA CAME FROM POSTING " + JSON.stringify(data))
                                fetchData(data)
                            })
                        })
                        document.getElementsByClassName("modal-bg")[0].classList.remove("bg-active")

                        console.log("Objct Location " + JSON.stringify(objectLocation))

                    }
                })
            })
        }



        console.log(inputField.value)

    }

    // function validateDate(data) {

    // }

    async function postData(data) {
        // Stop here till the end of the meeting

        let url = "http://localhost:8000/new_trip"
        if (!validateLocalhost(url)) {
            console.log("Ivalid url " + url)
            return
        }
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };
        try {
            const fetchResponse = await fetch(url, settings);
            const data = await fetchResponse.json();
            return data;
        } catch (e) {
            return e;
        }

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
async function getImageRelated(city, imageKey) {
    let url = `https://pixabay.com/api/?key=${imageKey}&q=${city}&image_type=photo&pretty=true`
    if (!validURL(url)) {
        console.log("Ivalid url " + url)
        return
    }
    console.log("URL Passed " + url)

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

async function getWeatherInfoRelated(lat, lng, tempkey) {
    console.log("Lat: " + lat)
    console.log("Long: " + lng)
    console.log("KEEEEEEY " + tempkey)
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${tempkey}`
    if (!validURL(url)) {
        console.log("Ivalid url " + url)

        return
    }
    console.log("url   Yemp " + url)

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