const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicGF0cmlja2FyaWNrIiwiYSI6ImNqdGg2c2ptdDBhaGk0M282ZW8yZnIxZXkifQ.ULdJIz8suPsRm-7NsNegwQ`;
  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Невозможно подключиться к гео-сервису!', undefined)
    } else if (body.features.length === 0) {
      callback('Не найдена локация', undefined)
    } else {
      callback(undefined,
        {
          latitude: body.features[0].center[1],
          longtitude: body.features[0].center[0],
          location: body.features[0].place_name
        })
    }
  })
};

module.exports = geocode;