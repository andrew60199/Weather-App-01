const citySearched = document.getElementById('search');
const historyList = document.getElementById('history');

let weatherObject = {};

const search = (event) => {
    
    if (citySearched.value === '') {
        return
    } 
    
    event.preventDefault();

    // console.log(citySearched.value);

    // If the search result already exists then bring it to the front and display the content
    // Otherwise generate a new search result.
    // console.log(document.getElementById(citySearched.value))

    const doesSearchResultAlreadyExist = (document.getElementById(citySearched.value));

    if (doesSearchResultAlreadyExist !== null) {
        // console.log('match')
        oppositeToAppend(historyList, doesSearchResultAlreadyExist)
    } else {
        createSearchHistoryElement();
    }
    
    displayCity();

    displayForecast();

    fetchWeather();

    // Event listener for history buttons

    // Run this last otherwise the variable will be reset
    document.getElementById('search').value = "";    
};

const createSearchHistoryElement = () => {
    
    const newListItem = document.createElement('li');
    newListItem.textContent = citySearched.value;
    newListItem.id = citySearched.value;
    newListItem.className = 'search-history-item';




    // weatherObject += citySearched.value
    // let weatherObjectStringed = JSON.stringify(weatherObject)
    // localStorage.setItem("searchHistory", weatherObjectStringed )


    // create button function

    // Reverse list order
    oppositeToAppend(historyList, newListItem);

}

// Opposite to appendChild https://www.youtube.com/watch?v=FGS6j8MtT6U
const oppositeToAppend = (parent, toInsert) => {
    const firstChild = parent.firstChild;
    parent.insertBefore(toInsert, firstChild);
}

const displayCity = () => {
    let cityHeading = document.getElementById('city-heading');

    cityHeading.textContent = 'Currently in '+ document.getElementById('history').firstChild.textContent;
}

const displayForecast = () => {
    let forecastHeading = document.getElementById('forecast-heading');

    forecastHeading.textContent = `Five Day Forecast`;
}

const loadSearchHistory = () => {
    // weatherObject = localStorage.getItem(weatherObject)

    // turn into a button?
}

const fetchWeather = () => {
  
    // console.log(citySearched.value)
    // Was getting a 400 Bad Request response status code indicates that the server cannot or will not process the request due to something that is perceived to be a client error
    // The value was blank... Since I placed the function below the clear statement... 
    // I could easily fix this by placing fetchWeather() before the clear statement. But having this here shows a way around it... 
    let city = document.getElementById('history').firstChild.textContent.toLowerCase();
    // console.log(city)
  
    // There are ways to hide keys on the back-end... I will learn about this in the future
    let key = '5b52afb6be1a1dd0bf03fa382e141a8b';
    let units = 'metric'
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=${units}`;

    fetch(url)
        .then(function (response) {
            // console.log(response);
            if (response.status !== 200) {
                // Would be better to display a message for the user
                console.log(response.status);
        }
         return response.json();
        })
         .then(function (data) {
            showWeather(data);
        });
}

// https://www.unixtimestamp.com/index.php use this to understand the actual time not what I it looked like
const showWeather = (data) => {
    console.log(data)

    let currentDiv = document.getElementById('currentWeather');
    let forecastDiv = document.getElementById('forecast');

    const currentTime = data.list[0]

    console.log(currentTime)

    // console.log(currentTime)
    // Giving us the whole array
    let dt = new Date(currentTime.dt * 1000)
    
    currentDiv.innerHTML = `<div class="focus">
        <h3 class="time">${dt.toDateString()}</h3>
        <img src="https://openweathermap.org/img/wn/${currentTime.weather[0].icon}@4x.png" class="image">
        <h3>Weather Conditions</h3>
        <p>Temperature: ${currentTime.main.temp}\u00B0C</p>
        <p>Humidity: ${currentTime.main.humidity}%</p>
        <p>Wind Speed: ${currentTime.wind.speed}m/s</p>
        </div>`;

    // I only want to select array items for 3pm 
    forecastDiv.innerHTML = data.list.map((day) => {

        // console.log(day.dt_txt)
        // Which helped me find https://www.w3schools.com/jsref/jsref_endswith.asp

        if (day.dt_txt.endsWith("03:00:00")) {

            console.log(day)

            let dt = new Date(day.dt * 1000)
            return `<div class="col">
            <h3 class="time">${dt.toDateString()}</h3>
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" class="image">
            <h3>Weather Conditions</h3>
            <p>Temperature: ${day.main.temp}\u00B0C</p>
            <p>Humidity: ${day.main.humidity}%</p>
            <p>Wind Speed: ${day.wind.speed}m/s</p>
            </div>`;
        }
    }).join('');
}

const init = () => {

    // Get search history from local storage
    loadSearchHistory();

    document.querySelector('input[type=submit]').addEventListener("click", search);

}

init()