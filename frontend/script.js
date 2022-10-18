const rootElement = document.querySelector("#root");
rootElement.insertAdjacentHTML("beforeend", `
<h1 class="cityName"></h1>
<form id="locationInput">
<input class="search" placeholder="city name" ></input>
<button class="search-button">Search</button>
</form>
`);



function fetchWeatherData() {
    fetch(`http://api.weatherapi.com/v1/search.json?key=c03e30c3acf1486cb5674845221710&q=Buda`, {
        "Connection": "keep-alive",
        "Vary": "Accept-Encoding",
        "Content-Length": "2334",
        "Content-Type": "text/html",
        "Date": "Mon, 17 Oct 2022 08:16:41 GMT"
      })
     //
    .then(response => response.json())
    .then(data => {
        console.log(data);
        cityName.innerHTML = data.location.name;
    })
    .catch(() => {

    });
    }
fetchWeatherData(); /*függvény meghívás page load-on*/