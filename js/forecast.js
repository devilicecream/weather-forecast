const citySearch = document.querySelector("#citySearch");
const searchBtn = document.querySelector("#searchBtn");

citySearch.addEventListener('keyup', function (e) {
  e.preventDefault();
  if (e.keyCode === 13) {
    document.querySelector("#searchBtn").click();
  }
  })

searchBtn.addEventListener('click', function() {
  alert(citySearch.value);
  citySearch.value = "";
});
