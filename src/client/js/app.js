import { validateLocalhost } from '../js/urlChecker'
// This method gets all the trips info from the server
async function fetallElements() {

    let url = `http://localhost:8000/allData`
    if (!validateLocalhost(url)) {
        console.log("Invalid url")
        return
    }

    const response = await fetch(url);

    try {
        const newData = await response.json();
        return newData
    } catch (error) {
        console.log("error", error);
    }
    console.log("data passed " + JSON.stringify(data));
}

// This method deletes a trip from a server
async function deleteATrip(id) {
    let url = `http://localhost:8000/trip`
    if (!validateLocalhost(url)) {
        console.log("Invalid url")
        return
    }
    const settings = {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({ "id": id })

    };
    try {
        const fetchResponse = await fetch(url, settings);
        const data = await fetchResponse.json();
        return data;
    } catch (e) {
        return e;
    }

}

// This method created and update the UI
function updateUI(data) {

    let alltrips = document.getElementsByClassName("trips")[0]
    data.forEach(function(item) {
        let newImg = document.createElement("DIV")
        let tripCity = document.createElement("H3")
        let tripNewDate = document.createElement("H3")
        let tripNewRemDays = document.createElement("P")
        let tripNewWeather = document.createElement("P")
        let genrealTripInfo = document.createElement("P")
        let buttonContainer = document.createElement("DIV")
        let removeButton = document.createElement("BUTTON")
        buttonContainer.classList.add("changeBtn")

        removeButton.innerText = "Remove Trip"
        removeButton.id = item.id
        removeButton.addEventListener('click', function() {
            // alert("Are you sure you want to delet this trip with id " + removeButton.id)
            let itemsAfterDeleting = deleteATrip(removeButton.id)
            itemsAfterDeleting.then(function(item) {
                if (confirm('Are you sure you want to Delete this trip?')) {
                    // Save it!
                    // console.log('Thing was saved to the database.');
                    updateUI(item)
                    location.reload();
                } else {
                    // Do nothing!
                    console.log('Thing was not saved to the database.');
                }
                console.log("DELETED " + JSON.stringify(item))

            })
        })
        buttonContainer.appendChild(removeButton)

        let tripCard = document.createElement("DIV")
        tripCard.classList.add("cardgrid")

        let infoPart = document.createElement("DIV")

        tripCity.innerHTML = `My trip to ${item.city}, ${item.country}`
        tripCity.classList.add("trip_city")
        infoPart.appendChild(tripCity)
        tripNewDate.innerHTML = `Departing : ${item.tripDate}`

        tripNewDate.classList.add("trip_date_fet")
        infoPart.appendChild(tripNewDate)

        infoPart.appendChild(buttonContainer)


        tripNewRemDays.innerHTML = `${item.city}, ${item.country} is ${item.dayasDiff} days away`
        tripNewRemDays.classList.add('trip_rem_days')
        infoPart.appendChild(tripNewRemDays)
        infoPart.classList.add("infopart")
        newImg.classList.add("imagepart")

        newImg.style.backgroundImage = `url(${item.imageURL})`
        tripCard.appendChild(newImg)

        tripNewWeather.innerHTML = `High - ${item.tripNewWeatherMax}, Low - ${item.tripNewWeatherMin}`
        tripNewWeather.classList.add("trip_weather_air")
        infoPart.appendChild(tripNewWeather)

        genrealTripInfo.innerHTML = `${item.weatherDescription}`
        genrealTripInfo.classList.add("trip_general_weather")
        infoPart.appendChild(genrealTripInfo)

        tripCard.appendChild(infoPart)

        alltrips.appendChild(tripCard)

    })
}

let home = fetallElements();
home.then(function(data) {
    updateUI(data)
})

export {
    updateUI
}