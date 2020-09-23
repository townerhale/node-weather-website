const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('postman-request')
const geocode = require ('./utils/geocode')
const forecast = require('./utils/forcast')

const app = express()
//port for heroku to access it
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath= path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// Setup static directory to serve from public
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Towner Hale'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Towner Hale'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'I do not know what is happening',
        name: 'Towner Hale'

    })
})


app.get('/weather', (req, res) =>{
    if (!req.query.address){
        return res.send({
            error: "Address must be provided"
        })
    }
    //destructure latitude, longtiude, and location from originally error, data
    geocode(req.query.address, (error, {latitude, longitude, location}={}) =>
    {
        if (error)
        {
            return res.send({error})

        }
        //forecastdata is the same as data
        forecast(latitude, longitude, (error, forecastData) =>{
            if (error)
            {
                return res.send({error})
            }

            res.send({
                forecast: forecastData, location,
                address: req.query.address
            })


        })


    })

})



app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.group(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('errors',{
        message: 'Help article not found',
        title: '404',
        name: 'Towner Hale'
    })

})

app.get('*', (req, res) =>{
    res.render('errors',{
        message: 'Page not found',
        name: 'Towner Hale',
        title: '404'

    })
})

//app.com, app.com/help, app.com/about

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})