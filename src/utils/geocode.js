const request = require('request')

const geocode = (address, callback) => {
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYm91bnR5aHVudGVyMTl4eCIsImEiOiJja2YyY3k3MDgwdDZrMnRtajhqdHYzbWp4In0.PEy2Ct1Q6BUnDSlo98Xa-Q&limit=1'

    request({ url , json: true}, (error, { body } ) => {
        if (error) {
            callback("Unable to connect to location services!")
        } else if(body.features.length === 0 ){
            // console.log("UNABLE TO FIND LoCATION")
            callback("Unable to find location. Try again with different search terms.", undefined)
        } else{
            callback(undefined, {
                lon: body.features[0].center[0],
                lat: body.features[0].center[1],
                location: body.features[0].place_name
            })
        } 
    })    
}


module.exports = geocode