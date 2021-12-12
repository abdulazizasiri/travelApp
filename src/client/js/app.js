async function getKey(url) {
    if (!validateLocalhost(url)) {
        console.log("Not valid url")
        return
    }
    const response = await fetch(url);

    try {
        const newData = await response.json();
        // console.log("Data came " + JSON.stringify(newData))
        return newData
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }

}

function fetchKeys(url) {
    console.log("URL " + url)
}