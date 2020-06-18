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
  downloadWeather();
});



function downloadWeather() {
  let userInput = citySearch.value;
  let url = baseURL + userInput.toLowerCase() + key;
  fetch(url)
    .then(function(response) {
      let data = response.json();
      return data
    }).then(function (data) {
      weatherInfo = data.list;
    }).catch(function (error) {
      alert('We had an error');
    })

  citySearch.value = "";
  // iframe.remove();
}
