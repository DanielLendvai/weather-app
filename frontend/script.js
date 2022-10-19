const rootElement = document.querySelector("#root");
let cityNames = [];

//input change method, add timeout, clear the array, datalist-> https://www.w3schools.com/tags/tag_datalist.asp

rootElement.insertAdjacentHTML(
    "beforeend",
    `
  <div class="container">
  <div hidden id="spinner"></div>
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
      <p></p>
      </div>
      <div class="humidity">
      <p></p>
      </div>
    </div>
    <div class="second-row">
      <div class="rain">
      <p></p>
      <img src=""/>
      </div>
      <div class="wind">
      <p></p>
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
const temperature = document.querySelector(".temperature p");
const humidity = document.querySelector(".humidity p");
const rain = document.querySelector(".rain p");
const rainIcon = document.querySelector(".rain img");
const wind = document.querySelector(".wind p");

cityNameInput.addEventListener("input", (e) => {
    cityNames = [];
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
            data.forEach((l) => {
                cityNames.push(l);
            });
        })
        .catch(() => {});
    cityName.textContent = e.target.value;
    fillOptions();
});

let inputValue = document.querySelector("#cityInput");
const spinner = document.getElementById("spinner");

btn.addEventListener("click", () => {
    temperature.textContent = "";
    humidity.textContent = "";
    rain.textContent = "";
    wind.textContent = "";
    rainIcon.src = "";
    spinner.removeAttribute("hidden");
    fetch("https://www.mocky.io/v2/5185415ba171ea3a00704eed?mocky-delay=1200ms")
        .then((response) => response.json())
        .then(() => {
            spinner.setAttribute("hidden", "");
        });
    setTimeout(() => {
        fetch(
            `http://api.weatherapi.com/v1/current.json?key=c03e30c3acf1486cb5674845221710&q=${inputValue.value}&aqi=no`
        )
            .then((response) => response.json())
            .then((data) => {
                temperature.textContent = data.current.temp_c + " °C";
                humidity.textContent = data.current.humidity + " %";
                rain.textContent = data.current.condition.text;
                rainIcon.src = data.current.condition.icon;
                wind.textContent = data.current.wind_kph + " km/h";
                cityName.textContent =
                    data.location.name + " - " + data.location.region;
                console.log(data);
            });
    }, "1300");
    fetch("https://api.pexels.com/v1/search?query=people", {
        headers: {
            Authorization: "563492ad6f91700001000001c2eb3b77f1ff41a1b1c542caf05a8f4d",
        },
    })
        .then((resp) => {
            return resp.json();
        })
        .then((data) => {
            console.log(data);
        });
});

function fillOptions() {
    setTimeout(() => {
        for (let i = 0; i < options.length; i++) {
            options[0].value = cityNames[0].name;
            options[1].value = cityNames[1].name;
            options[2].value = cityNames[2].name;
        }
    }, "1000");
}
