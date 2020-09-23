const request = require('request')

const forecast = (lat, lon, callback) =>{
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ lat + '&lon=' + lon +'&appid=57f133dbf8f46f9bc8110261a6b9aebe&units=metric'

    request( {url, json: true}, (error, { body })=>{
        if (error){
            callback('Unable to connect to weather service!')
        } else if(body.cod){
            callback('Unable to find the location!')
        } else{
            // console.log(body.daily)
            callback(undefined, `The weather situation is: ${body.current.weather[0].description}.\n 
            It is currently ${body.current.temp} degrees out.\n
            Maximum temp. today: ${body.daily[0].temp.max} degrees\n
            Minimum temp. today: ${body.daily[0].temp.min} degrees
            `)
        }
    } )
}

module.exports = forecast