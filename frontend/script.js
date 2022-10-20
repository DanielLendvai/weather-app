const rootElement = document.querySelector("#root");
let cityNames = [];
let cityImages = [];

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
    setTimeout(() => { 
        cityImages = [];
        fetch(`https://api.pexels.com/v1/search?query=${cityName.textContent} city`, {
            headers: {
                Authorization: "563492ad6f91700001000001c2eb3b77f1ff41a1b1c542caf05a8f4d",
            },
        })
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                cityImages.push(data.photos)
                console.log(cityImages[0][2].src.original)
            });
    }, "1600")

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
                let timeOfDay = "day"; /* set default time of day*/
                const code = data.current.condition.code; /*add unique id for each weather condition*/
                if(!data.current.is_day) {
                    timeOfDay = "night";
                }
                if(code == 1000) {
                    app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`
                    btn.style.background = "#e5ba92";
                    if(timeOfDay == "night") {
                        btn.style.background = "#181e27";
                    }
                }else if (
                    code == 1003 ||
                    code == 1006 ||
                    code == 1009 ||
                    code == 1030 ||
                    code == 1069 ||
                    code == 1087 ||
                    code == 1135 ||
                    code == 1273 ||
                    code == 1276 ||
                    code == 1282
                ) {
                    app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
                    btn.style.background = "#fa6d1b";
                    if(timeOfDay == "night") {
                        btn.style.background = "#181e27";
                        }
                }else if (
                    code == 1063 ||
                    code == 1069 ||
                    code == 1072 ||
                    code == 1150 ||
                    code == 1153 ||
                    code == 1180 ||
                    code == 1183 ||
                    code == 1186 ||
                    code == 1189 ||
                    code == 1192 ||
                    code == 1195 ||
                    code == 1204 ||
                    code == 1207 ||
                    code == 1240 ||
                    code == 1243 ||
                    code == 1246 ||
                    code == 1249 ||
                    code == 1252 
                ){
                    app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
                    btn.style.background = "#647d75";
                    if(timeOfDay == "night") {
                        btn.style.background = "#325c80";
                    }
                }else{
                    app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
                    btn.style.background = "#4d72aa";
                    if(timeOfDay == "night") {
                        btn.style.background = "#1b1b1b";
                    }
                }
            });
    }, "1300");
    
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
