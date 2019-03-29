const request = require('request');


const forecast = (latitude, longtitude, callback) => {
  const url = `https://api.darksky.net/forecast/1652248e9bd65679c291a3ba36433565/${encodeURIComponent(`${latitude}, ${longtitude}`)}?lang=ru&units=si`;

  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Невозможно подключиться к сервису погоды!', undefined)
    } else if (body.error) {
      callback('Не найдена локация!', undefined)
    } else {
      callback(undefined, (
        `Температура: ${body.currently.temperature}, ${body.daily.data[0].summary} Вероятность дождя -  ${body.currently.precipProbability * 100}%`)
      )
    }
  })
};

module.exports = forecast;