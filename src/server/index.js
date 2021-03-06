const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv');

const port = 8000;
// This object used to retervie and post data data. 

let allResults = []

const app = express()
dotenv.config();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use(express.static('dist'))
app.listen(port, listening)


let weatherbitandImageKeys = weatherbitandImagesObject = {
    application_id: process.env.WEATHER_API_KEY,
    pixaby_key: process.env.PIXABY_KEY,
    geo_userName: process.env.GEONAME_USER
};

console.log("API Key 1 " + weatherbitandImageKeys.application_id)
console.log("Api key 2 " + weatherbitandImageKeys.pixaby_key)
console.log("Api key 3 " + weatherbitandImageKeys.geo_userName)

app.get("/", function(req, res) {
    console.log("Hello")
    console.log("HELLO")
    res.sendFile(path.resolve('dist/index.html'))
})

app.get("/allData", function(req, res) {
    console.log("All data here")
    return res.json(allResults)
})

app.get("/getAllKeys", function(req, res) {
        let keyObj = {
            "weather_key": weatherbitandImageKeys.application_id,
            "pixabay_key": weatherbitandImageKeys.pixaby_key,
            "geo_userName": weatherbitandImageKeys.geo_userName,
            "code": 200
        }
        return res.json(keyObj)
    })
    // post 
app.post("/new_trip", function(req, res) {
        // 
        console.log("REQ " + JSON.stringify(req.body))
        console.log("Type " + typeof req.body)
        console.log("Length: " + allResults.length)
        allResults.push(req.body)
        return res.json(allResults)
    })
    // delete
app.delete("/trip", function(req, res) {
    let id = req.body.id
    let newItems = allResults.filter(function(item) {
        return item.id != id
    })
    allResults = newItems

    console.log("After deleting " + newItems.length)

    console.log("ITem to be deleted " + req.body.id)
        // console.log("the id to be deleted: " + id)
    return res.json(allResults)
})


function listening() {
    console.log("server running");
    console.log(`Running on Port ${port}`);
}