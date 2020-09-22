const path = require('path')
// express is actually a function, and we call it to create a new express application
const express = require('express')

const app = express() 
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))// serve up that public folder

//server should do when someone tries to get the resource at a specific url
// app.get('', (req, res) => { // root route
//     res.send('<h1>Weather</h1>')
// }) 

app.get('/help', (req, res) => { // route help 
    res.send([{
        name: "Shrish",
        age: 21
    },{
        name: "Purnima",
        age: 14
    }
    ])
}) 
app.get('/about', (req, res) => {
    res.send("<h1>About</h1>")
}) 
app.get('/weather', (req, res) => {
    res.send({
        forecast: "Rainy",
        location: "Pokhara"
    })
}) 


//start the server, port 
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})