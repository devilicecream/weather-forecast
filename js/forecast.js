const citySearch = document.querySelector("#citySearch");
const searchBtn = document.querySelector("#searchBtn");
const form = document.querySelector('form');
const cityName = document.querySelector('#cityName');
const weatherTitle = document.querySelector('#weatherTitle');
const weatherIcon = document.querySelector('#weatherIcon');
const actualTemp = document.querySelector('#actualTemp');
const humidity = document.querySelector('#humidity');
const pressure = document.querySelector('#pressure');
const table = document.querySelector('table');
const next24hours = document.querySelector('#next24hours');
const posBtn = document.querySelector('#posBtn');



const KELVIN = 273;
const key = '&appid=436faa03983b144a87745bd11c39811e';

let baseURL = 'http://api.openweathermap.org/data/2.5/forecast?q=';
let weatherInfo;

posBtn.addEventListener('click', function() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(donwloadJsonFromPos);
  } else {
    alert('Your browser doesn\'t support geolocation. Select your city manually');
  }
  async function donwloadJsonFromPos(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let posurl = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}`+key;
    console.log(posurl);
    await downloadJSON(posurl);
  }
  posBtn.remove()
});


citySearch.addEventListener('keyup', function (e) {
  e.preventDefault();
  if (e.keyCode === 13) {
    document.querySelector("#searchBtn").click();
  }
});

searchBtn.addEventListener('click', async function(e) {
  e.preventDefault();
  let finalurl = baseURL + citySearch.value.toLowerCase() + key;
  await downloadJSON(finalurl);
  console.log('Okay');
  // await compileHeading();
});


function downloadJSON(url) {
  fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status; ${response.status}`);
    } else {
    let data = response.json();
    return data;
  }
}).then(response => {
  weatherInfo = response;
}).then( function () {
  next24hours.style.display = 'block';
  compileHeading();
  compileTable();
});
// .then(function () {
//   compileTable();
// });
form.reset();
};

function compileHeading() {
  cityName.textContent = `${weatherInfo.city.name}, ${weatherInfo.city.country} `;
  weatherIcon.src = `icons/${weatherInfo.list[0].weather[0].icon}.png`;
  weatherIcon.style.display = 'flex';
  weatherTitle.textContent = `${weatherInfo.list[0].weather[0].main} - ${weatherInfo.list[0].weather[0].description}`;
  actualTemp.textContent = `${Math.floor(weatherInfo.list[0].main.temp- KELVIN)}° C`;
  humidity.textContent= `${weatherInfo.list[0].main.humidity} %`;
  pressure.textContent= `${weatherInfo.list[0].main.pressure} hPA`;
}

function compileTable() {
  for (let i=0; i<8; i++) {
    console.log(i);
    let icon = document.createElement('img');
    icon.src = `icons/${weatherInfo.list[(i+1)].weather[0].icon}.png`;
    icon.style.height = '60px';
    let tableRow = table.insertRow(i+1);
    let hourCell = tableRow.insertCell(0);
    hourCell.textContent = `${weatherInfo.list[(i+1)].dt_txt.substring(10,19)}`;
    let weatherCell = tableRow.insertCell(1);
    weatherCell.textContent = `${weatherInfo.list[(i+1)].weather[0].main} - ${weatherInfo.list[0].weather[0].description}`;
    let iconCell = tableRow.insertCell(2);
    iconCell.setAttribute('class', 'iconCell')
    iconCell.appendChild(icon);
    let tMinCell = tableRow.insertCell(3);
    tMinCell.textContent = `${Math.floor(weatherInfo.list[(i+1)].main.temp_min- KELVIN)}° C`;
    let tMaxCell = tableRow.insertCell(4);
    tMaxCell.textContent = `${Math.floor(weatherInfo.list[(i+1)].main.temp_max- KELVIN)}° C`;;
  }
}

//
// function downloadWeather() {
//   let userInput = citySearch.value;
//   let url = baseURL + userInput.toLowerCase() + key;
//   fetch(url)
//     .then(function(response) {
//       let data = response.json();
//       return data
//     }).then(function (data) {
//       weatherInfo = data.list;
//       return weatherInfo
//     }).catch(function (error) {
//       alert('We had an error');
//     })

  // citySearch.value = "";
  // iframe.remove();
