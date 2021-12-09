(function() {
    // api.openweathermap.org/data/2.5/weather?zip=94040,us&appid={API key}
    const baseUrl = "api.openweathermap.org/data/2.5/weather?";
    const apiKey = "e6a584d2742182c67937adef00acd8d7";

    let generateBtn = document.getElementById("generate") // The button 


    generateBtn.addEventListener("click", function(event) {
        // Grab the zip code and the status of the user.
        let zipCode = document.getElementById("zip")
        let feelingStatus = document.getElementById("feelings")
        console.log("Zip code " + zipCode.value)
        console.log("Feeling now" + feelingStatus.value)
        let fullUrl = `https://${baseUrl}zip=${zipCode.value},us&appid=${apiKey}`
        console.log("Full url " + fullUrl)
        let = getZipData(fullUrl, feelingStatus.value)
        event.preventDefault();
    })

    // Get the data from openWeatherAPI then parse it and send it to the server.
    function getZipData(url, feelingStatus) {
        console.log("Zip url " + url)
        let data = getDataFromOpenWeatherAPI(url)
        data.then(function(da) {
            // let parsedData = JSON.stringify(da)
            // const dataEntry = {"date" : new Date()}
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            const dataEntry = { "date": date, "temp": JSON.stringify(da.main.temp), "feeling": feelingStatus }
                // We need to post this data to the server
            let data = postData("http://localhost:8000/newPost", dataEntry)
            updateUI("http://localhost:8000/all")



        })

    }

    function updateUI(url) {
        retrieveData(url)
    }

    const retrieveData = async(url) => {
        const request = await fetch(url);
        try {
            // Transform into JSON
            const allData = await request.json()

            console.log("All Data " + JSON.parse(allData))
            document.getElementById('temp').innerHTML = `Temperature 🌡 ${Math.round(JSON.parse(allData).temp)}  degrees `;
            document.getElementById('content').innerHTML = `Feeling Today? 😍 ${JSON.parse(allData).feeling}`
            document.getElementById("date").innerHTML = `Date 🗓 ${JSON.parse(allData).date}`
        } catch (error) {
            console.log("error", error);
        }
    }
    const postData = async(url, data) => {
        // console.log(data);
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                mode: 'no-cors',

            },
            // Body data type must match "Content-Type" header        
            body: JSON.stringify(data),
        });

        try {
            const newData = await response.json();
            console.log(newData);
            return newData;
        } catch (error) {
            console.log("error", error);
        }
    }

    const getDataFromOpenWeatherAPI = async(baseUrl) => {

        const response = await fetch(baseUrl);

        try {
            const newData = await response.json();
            // console.log("Data came " + JSON.stringify(newData))
            return newData
        } catch (error) {
            console.log("error", error);
            // appropriately handle the error
        }

    }

})();