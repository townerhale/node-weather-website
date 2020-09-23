
const request = require('postman-request')
const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7734fd7188c7ada4c64935c66be40c58&query=' + lat +',' + long + '&units=f'

    request({ url}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        }
        else if (JSON.parse(body).error)
        {
            callback('Unable to find location', undefined)
        }
        else
        {
            //set undefined because it does not have a value for data
            callback(undefined, JSON.parse(body).current.weather_descriptions[0]+ '. It is currently ' +
            JSON.parse(body).current.temperature + ' degrees out. There is a ' + JSON.parse(body).current.precip + '% chance of rain. There is an UV index of '+ JSON.parse(body).current.uv_index)

        }
    })

}

module.exports = forecast
