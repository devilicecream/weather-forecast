const citySearch = document.querySelector("#citySearch");
const searchBtn = document.querySelector("#searchBtn");


const KELVIN = 273;
const key = '&appid=436faa03983b144a87745bd11c39811e';

let baseURL = 'http://api.openweathermap.org/data/2.5/forecast?q=';
let weatherInfo= {}

citySearch.addEventListener('keyup', function (e) {
  e.preventDefault();
  if (e.keyCode === 13) {
    document.querySelector("#searchBtn").click();
  }
  })

searchBtn.addEventListener('click', function() {
  let db= downloadWeather(citySearch.value);
  console.log(weatherInfo);
});



function downloadWeather(cityName) {
  let url = baseURL + cityName.toLowerCase() + key;
  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function (data) {
    weatherInfo = data.list;
    return weatherInfo;
    })
  .catch(function (error) {
    alert('Something went wrong');
  })
  return weatherInfo;
}
