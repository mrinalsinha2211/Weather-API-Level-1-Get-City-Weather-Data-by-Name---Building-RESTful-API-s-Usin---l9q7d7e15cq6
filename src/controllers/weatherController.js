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
   const data=await getDataFromDatabase();
  const cityData=data.find((cityData)=>cityData.city.toLowercase()===cityName.toLowercase());
  if(cityData){
    return cityData.weather;
  }else{
    throw new error("Not found");
  }
}


module.exports = {
  getWeatherDataByName
};
