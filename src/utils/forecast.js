const request = require('request')

const forecast = (lat, lon, callback) =>{
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ lat + '&lon=' + lon +'&appid=57f133dbf8f46f9bc8110261a6b9aebe&units=metric'

    request( {url, json: true}, (error, { body })=>{
        if (error){
            callback('Unable to connect to weather service!')
        } else if(body.cod){
            callback('Unable to find the location!')
        } else{
            // const resBody = response.body
            callback(undefined, `It is currently ${body.current.temp} degrees out.The weather situation is: ${body.current.weather[0].description}`)
        }
    } )
}

module.exports = forecast