const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 8000;
// This object used to retervie and post data data. 
projectData = {} // This object will be storing data 


const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use(express.static('dist'))
app.listen(port, listening)


app.get("/", function(req, res) {
    res.sendFile(path.resolve('dist/index.html'))

})
app.get("/all", function(req, res) {
    console.log("GET ALL " + projectData.length)
    return res.json(projectData)
})

app.post("/newPost", function(req, res) {
    console.log("The BODY send " + JSON.stringify(req.body))
    projectData = JSON.stringify(req.body)
    return res.body
})

function listening() {
    console.log("server running");
    console.log(`Running on Port ${port}`);
}