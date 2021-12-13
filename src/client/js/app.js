function fetchData(data) {
    console.log("DATA " + JSON.stringify(data))

    let imageResult = getImageRelated(data.city, data.imageKey) // 
    let tempResult = getWeatherInfoRelated(data.lat, data.lng, data.weatherKey)
}
async function getWeatherInfoRelated(lat, lng, tempkey) {
    console.log("Lat: " + lat)
    console.log("Long: " + lng)
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${tempkey}`

    console.log("url   Yemp " + url)
}
async function getImageRelated(city, imageKey) {
    let url = `https://pixabay.com/api/?key=${imageKey}&q=${city}&image_type=photo&pretty=true`
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

export {
    fetchData
}