const rootElement = document.querySelector("#root");
rootElement.insertAdjacentHTML(
    "beforeend",
    `
<h1 class="city-name"></h1>
<input type="text" class="city-name-input">
<datalist class="country-list">
</datalist>
<button></button>
`
);
const cityName = document.querySelector(".city-name");
const cityNameInput = document.querySelector(".city-name-input");
const btn = document.querySelector("button");
const dataList = document.querySelector("datalist");

let cityNames = [];

/* function fetchWeatherData() {
    fetch(
        `http://api.weatherapi.com/v1/search.json?key=c03e30c3acf1486cb5674845221710&q=${cityInput}`,
        {
            Connection: "keep-alive",
            Vary: "Accept-Encoding",
            "Content-Length": "2334",
            "Content-Type": "text/html",
            Date: "Mon, 17 Oct 2022 08:16:41 GMT",
        }
    )
        .then((response) => response.json())
        .then((data) => {})
        .catch(() => {});
} */
cityNameInput.addEventListener("input", (e) => {
    fetch(
        `http://api.weatherapi.com/v1/search.json?key=c03e30c3acf1486cb5674845221710&q=${e.target.value}`,
        {
            Connection: "keep-alive",
            Vary: "Accept-Encoding",
            "Content-Length": "2334",
            "Content-Type": "text/html",
            Date: "Mon, 17 Oct 2022 08:16:41 GMT",
        }
    )
        .then((response) => response.json())
        .then((data) => {
          data.forEach((c) => {
            if(!cityNames.includes(c)) {
              cityNames.push(c)
            }
          })
            /* for (let i = 0; i < data.length; i++) {
                if (!cityNames.includes(data[i].name)) 
                cityNames.push(data[i]);
            } */

        })
        .catch(() => {});
    cityName.textContent = e.target.value;
    console.log(cityNames);
});
