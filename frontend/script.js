const rootElement = document.querySelector("#root");
let cityNames = [];

//input change method, add timeout, clear the array, datalist-> https://www.w3schools.com/tags/tag_datalist.asp

rootElement.insertAdjacentHTML("beforeend");
const cityName = document.querySelector(".city-name");
const cityNameInput = document.querySelector("#cityInput");
const btn = document.querySelector("button");

cityNameInput.insertAdjacentHTML(
  "afterend",
  `
    <datalist id="cities">
        <option value="">
        <option value="">
        <option value="">
        <option value="">
        <option value="">
    </datalist>
    `
);

let options = document.querySelectorAll("option");

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
});
