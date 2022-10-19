const rootElement = document.querySelector("#root");
rootElement.insertAdjacentHTML(
    "beforeend",
    `
<h1 class="city-name"></h1>
<input type="text" class="city-name-input">
<button></button>
`
);
const cityName = document.querySelector(".city-name");
const cityNameInput = document.querySelector(".city-name-input");
const btn = document.querySelector("button");

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
//input change method, add timeout, clear the array, datalist-> https://www.w3schools.com/tags/tag_datalist.asp

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
                if(!cityNames.find(city => city.name === c)) {
                  cityNames.push(c)
                }
              })
            })
            .catch(() => {});
    cityName.textContent = e.target.value;
    console.log(cityNames);
});
