const searchTerm = document.querySelector("#searchTerm");
const searchBtn = document.querySelector("#searchBtn");
const iframe = document.querySelector("iframe");
const weatherTitle = document.querySelector(".weatherTitle");
const weatherIcon = document.querySelector(".weatherIcon");
const tMin = document.querySelector(".tmin");
const tMax = document.querySelector(".tmax");





const KELVIN = 273;
const key = '&appid=436faa03983b144a87745bd11c39811e';

let baseURL = 'http://api.openweathermap.org/data/2.5/forecast?q=';


let meteodb = {};

function downloadJson() {
  let userInput = searchTerm.value;
  let url = baseURL + userInput.toLowerCase() + key;
  fetch(url)
    .then(function(response) {
      let data = response.json();
      return data
    }).then(function (data) {
      meteodb = data.list;
    }).catch(function (error) {
      alert('We had an error');
    })

  searchTerm.value = "";
  // iframe.remove();
}

function displayWeather() {
  let iconId = `${meteodb[0].weather[0].icon}`;
  weatherTitle.textContent = `${meteodb[0].weather[0].main}`;
  weatherIcon.innerHTML = `<img width="40" src="icons/${iconId}.png"/>`;
  tMin.textContent = `${Math.floor(meteodb[0].main.temp_min - KELVIN) + '° C'}`;
  tMax.textContent = `${Math.floor(meteodb[0].main.temp_max - KELVIN)+ '° C'}`;

}


searchBtn.addEventListener('click', function() {
  downloadJson();
});



// searchBtn.addEventListener('click', function (){
//     let userInput = searchTerm.value;
//     let url = baseURL + userInput.toLowerCase() + key;
//     fetch(url)
//       .then(response => response.json())
//       .then(data => meteodb = data)
//       .catch(err => alert('Wrong city name'));
//   });
