const fs = require('fs');

async function getDataFromDatabase() {
  return new Promise((resolve, reject) => {
    fs.readFile('src/data/data.json', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

async function saveDataToDatabase(data) {
  return new Promise((resolve, reject) => {
    const jsonData = JSON.stringify(data);
    fs.writeFile('src/data/data.json', jsonData, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Level 1: Get City Weather Data by Name
async function getWeatherDataByName(cityName) {
  //  const data=await getDataFromDatabase();
  // const cityData=data.find((cityData)=>cityData.city.toLowercase()===cityName.toLowercase());
  // if(cityData){
  //   return cityData.weather;
  // }else{
  //   throw new Error("Not found");
  // }
  const data = await getDataFromDatabase();
  const cityData = data.find((cityData) => cityData.city.toLowerCase() === cityName.toLowerCase());
  if (cityData) {
    return {
      status: 'success',
      message: 'Weather data retrieved',
      data: {
        city: cityData.city,
        temperature: cityData.weather.temperature,
        humidity: cityData.weather.humidity,
        windSpeed: cityData.weather.windSpeed,
        conditions: cityData.weather.conditions,
      },
    };
  } else {
    throw {
      status: 'error',
      message: 'Failed to retrieve weather data',
      error: 'City not found',
    };
  }
  
}


module.exports = {
  getWeatherDataByName
};
