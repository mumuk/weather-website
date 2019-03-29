const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const request = require('request');

const app = express(); //запускаем экспресс
const rootDir = __dirname; // __dirname - папка проекта

//Определяем пути для Express config
const publicDirectoryPath = path.join(rootDir, '../public');
const viewsPath = path.join(rootDir, '../templates/views'); //Задаем новый путь к нашим views
const partialsPath = path.join(rootDir, '../templates/partials'); //Задаем новый путь к нашим partials

//Установка движка handlebars и расположение views
app.set('view engine', 'hbs'); //указываем экспрессу какой тип шаблонизатора
app.set('views', viewsPath); // Указываем hbs новый путь что задали строкой выше
hbs.registerPartials(partialsPath); // Указываем hbs новый путь что задали для  partials

//Путь для статичных файлов (css, img итп)
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather main page',
    name: 'author'
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'And about our project',
    name: 'Corp of LM'
  })
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    name: 'MIKE',
    helpText: 'Here is a help for you!'
  })
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Необходимо ввести адрес!'
    })
  }
  const location = req.query.address;
  geocode(location, (error, {latitude, longtitude, location}={}) => {
    if (error) {
      return res.send({error});
    }

    forecast(latitude, longtitude, (error, forecastData) => {
      if (error) {
        return res.send({error});
      }

      res.send({
        title: 'Прогноз погоды для:',
        location,
        forecast: forecastData,
      })
    });
  });


});


app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  console.log(req.query);
  res.send({
    products: []
  })
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Oops 404 page!',
    name: 'MIKE',
    errorMessage: 'Help article not found'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Oops 404 page!',
    name: 'MIKE',
    errorMessage: 'Page not found!'
  });
});


app.listen(3000, () => {
  console.log('Server is up on port 3000.')
});