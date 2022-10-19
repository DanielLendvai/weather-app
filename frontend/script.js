const rootElement = document.querySelector("#root");
let cityNames = [];

//input change method, add timeout, clear the array, datalist-> https://www.w3schools.com/tags/tag_datalist.asp

rootElement.insertAdjacentHTML(
  "beforeend",
  `
  <div class="container">
  <div class="input">
    <label for="">See the weather in...</label>
    <input placeholder="Start typing" type="text" list="cities" name="city" id="cityInput" value=""/>
    <datalist id="cities">
        <option value="">
        <option value="">
        <option value="">
        <option value="">
        <option value="">
        <option value="">
        </datalist>
    <button id="searchButton">Search</button>
  </div>
  <div class="city-name"></div>
  <div class="datas">
    <div class="first-row">
      <div class="temperature">
      </div>
      <div class="humidity">
      </div>
    </div>
    <div class="second-row">
      <div class="rain">
      </div>
      <div class="wind">
      </div>
    </div>
  </div>
</div>
`
);
const cityName = document.querySelector(".city-name");
const cityNameInput = document.querySelector("#cityInput");
const btn = document.querySelector("#searchButton");
const dataList = document.querySelector("datalist");
const options = document.querySelectorAll("option");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");
const rain = document.querySelector(".rain");
const wind = document.querySelector(".wind");

cityNameInput.addEventListener("input", (e) => {
  cityNames = [];
  fetch(
    `http://api.weatherapi.com/v1/search.json?key=c03e30c3acf1486cb5674845221710&q=${e.target.value}`
    // {
    //   Connection: "keep-alive",
    //   Vary: "Accept-Encoding",
    //   "Content-Length": "2334",
    //   "Content-Type": "text/html",
    //   Date: "Mon, 17 Oct 2022 08:16:41 GMT",
    // }
  )
    .then((response) => response.json())
    .then((data) => {
      data.forEach((l) => {
        cityNames.push(l);
      });
    })
    .catch(() => {});

  cityName.textContent = e.target.value;
  fillOptions();
});

let inputValue = document.querySelector("#cityInput");

btn.addEventListener("click", () => {
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=c03e30c3acf1486cb5674845221710&q=${inputValue.value}&aqi=no`
  )
    .then((response) => response.json())
    .then((data) => {
      temperature.insertAdjacentHTML(
        "beforeend",
        `<p>${data.current.temp_c}</p>`
      );
      humidity.insertAdjacentHTML(
        "beforeend",
        `<p>${data.current.humidity}</p>`
      );
      rain.insertAdjacentHTML(
        "beforeend",
        `<p>${data.current.condition.text}</p>`
      );
      wind.insertAdjacentHTML("beforeend", `<p>${data.current.wind_kph}</p>`);
    });
});

function fillOptions() {
  setTimeout(() => {
    for (let i = 0; i < options.length; i++) {
      options[0].value = cityNames[0].name;
      options[1].value = cityNames[1].name;
      options[2].value = cityNames[2].name;
      options[3].value = cityNames[3].name;
      options[4].value = cityNames[4].name;
      options[5].value = cityNames[5].name;
    }
  }, "1000");
}
