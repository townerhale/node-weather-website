
const request = require('postman-request')
//callback is what we call once we have lat and long
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidG93bmVyaGFsZSIsImEiOiJja2YxdmZ4enQxYzMzMnFzMmY0OTV0YzdtIn0.jHzUwzXdSKO_qN0PkkTeKw'

    request({ url}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        }
        else if (JSON.parse(body).features.length===0)
        {
            callback('Unable to find location', undefined)
        }
        else
        {
            //set undefined because it does not have a value for data
            callback(undefined, {
               latitude: JSON.parse(body).features[0].center[1],
               longitude: JSON.parse(body).features[0].center[0],
               location: JSON.parse(body).features[0].place_name,
            })
        }
    })
}

module.exports = geocode