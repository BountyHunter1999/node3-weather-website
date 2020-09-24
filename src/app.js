const path = require('path')
// express is actually a function, and we call it to create a new express application
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express() 
const port = process.env.PORT || 3000 // heroku ko lagi PORT || locally ko lagi 3000 


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')// tyo views vanna default folder lai change garna lai
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs') // key(setting name, value)
app.set('views', viewsPath) // root ma herthyo natra tyo change hanako
hbs.registerPartials(partialsPath)

// Setup static directory to serve, yaha bata herna suru hunxa 
app.use(express.static(publicDirectoryPath))// serve up that public folder



app.get('', (req, res) => {
    res.render('index', { // index hbs 
        title: 'Weather',
        name: 'Shrish Adhikari'
    })
})

app.get('/about', (req, res) => {
    res.render('about', { //view , object to send
        title: 'About Me',
        name: 'Shrish Adhikari'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: "If You Have Any Problem, Contact Me...",
        title: 'Help',
        name: 'Shrish'
    })
})

app.get('/weather', (req, res) => { // yo bata json linxa hamro site  
    if (!req.query.address) // query ma ? address jastari auna parxa
        return res.send({ error: 'Address Not Provided' })

        geocode(req.query.address, (error, { lat, lon, location} = {} ) => { 
            if (error)
                return res.send({ error })
            
            forecast(lat, lon, (error, forecastData) => {
                if (error)
                    return res.send({ error })
        
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address,
              })
        })
    })
}) 

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shrish',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shrish',
        errorMessage: 'Page not found'
    })
})

//start the server, port 
app.listen(port, () => {
    console.log('Server is up on port '+ port)
})