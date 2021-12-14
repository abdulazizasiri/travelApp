function fetchData(data) {
    console.log("DATA " + JSON.stringify(data))
    let newImg = document.createElement("DIV")
    let imageElement = document.getElementsByClassName("imagepart")[0]
    let tripCity = document.createElement("H3")

    let tripLocation = document.getElementsByClassName("trip_city")[0] // My trip to Paris, France
    let tripNewDate = document.createElement("H3")

    let tripDate = document.getElementsByClassName("trip_date_fet")[0] // Departing: 02/12/2020
    let tripNewRemDays = document.createElement("P")
    let remaingDays = document.getElementsByClassName("trip_rem_days")[0] // Paris, France is 220 days away
    let tripNewWeather = document.createElement("P")
    let tripWeatherAir = document.getElementsByClassName("trip_weather_air")[0] //High - 46, Low - 35
    let genrealTripInfo = document.createElement("P")
    let tripGeneralWeatherStatus = document.getElementsByClassName("trip_general_weather")[0] // Mostly Cloudy throughout the day
    let buttonContainer = document.createElement("DIV")
    let removeButton = document.createElement("BUTTON")
    buttonContainer.classList.add("changeBtn")
    removeButton.innerText = "Remove Trip"
    buttonContainer.appendChild(removeButton)

    let alltrips = document.getElementsByClassName("trips")[0]
        // let tripCard = document.getElementsByClassName('cardgrid')[0]
    let tripCard = document.createElement("DIV")
    tripCard.classList.add("cardgrid")

    // let infoPart = document.getElementsByClassName("infopart")[0]
    let infoPart = document.createElement("DIV")
    infoPart.classList.add("infopart")
    let imageResult = getImageRelated(data.city, data.imageKey) //
    imageResult.then(function(dataImage) {
        newImg.style.backgroundImage = `url(${dataImage.hits[0].webformatURL})`
            // imageElement.style.backgroundImage = `url(${dataImage.hits[0].webformatURL})`
        newImg.classList.add("imagepart")
            // Not appended

        tripCard.appendChild(newImg)
        console.log("Image Data " + (dataImage.hits[0].webformatURL))
    })
    let tempResult = getWeatherInfoRelated(data.lat, data.lng, data.weatherKey)
    tempResult.then(function(weatherData) {
        // dayasDiff
        // tripDate.innerHTML = `Departing : ${data.tripDate}`
        tripNewDate.innerHTML = `Departing : ${data.tripDate}`
        tripNewDate.classList.add("trip_date_fet")
        infoPart.appendChild(tripNewDate)

        // tripLocation.innerHTML = `My trip to ${data.city}, ${data.country}`
        tripCity.innerHTML = `My trip to ${data.city}, ${data.country}`
        tripCity.classList.add("trip_city")
        infoPart.appendChild(tripCity)

        infoPart.appendChild(buttonContainer)

        // remaingDays.innerHTML = `${data.city}, ${data.country} is ${data.dayasDiff} days away`
        tripNewRemDays.innerHTML = `${data.city}, ${data.country} is ${data.dayasDiff} days away`
        tripNewRemDays.classList.add('trip_rem_days')
        infoPart.appendChild(tripNewRemDays)

        // tripWeatherAir.innerHTML = `High - ${weatherData.data[0].app_max_temp}, Low - ${weatherData.data[0].app_min_temp}`

        tripNewWeather.innerHTML = `High - ${weatherData.data[0].app_max_temp}, Low - ${weatherData.data[0].app_min_temp}`
        tripNewWeather.classList.add("trip_weather_air")
        infoPart.appendChild(tripNewWeather)

        // tripGeneralWeatherStatus.innerHTML = `${weatherData.data[0].weather.description}`
        genrealTripInfo.innerHTML = `${weatherData.data[0].weather.description}`
        genrealTripInfo.classList.add("trip_general_weather")
        infoPart.appendChild(genrealTripInfo)


        tripCard.appendChild(infoPart)

        alltrips.appendChild(tripCard)

        console.log(weatherData.data)
    })
}
async function getWeatherInfoRelated(lat, lng, tempkey) {
    console.log("Lat: " + lat)
    console.log("Long: " + lng)
    console.log("KEEEEEEY " + tempkey)
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${tempkey}`

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
async function getImageRelated(city, imageKey) {
    let url = `https://pixabay.com/api/?key=${imageKey}&q=${city}&image_type=photo&pretty=true`

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

export {
    fetchData
}