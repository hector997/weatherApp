import React, { useState } from 'react';


const api = {
  key: "cf1c44908b6718d4b48b40a33ae54f63",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  return (
    <div className={ (typeof weather.main != "undefined") ? ((weather.main.temp > 20) ? 'app-warm' : 'app-cold') : 'app' }>
      <main >
        <div className="searchBox">
            <input 
            type="text"
            className="searchBar"
            placeholder="Enter your city"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            ></input>
        </div>
        
          {(typeof weather.main != "undefined") ? (
            <div>
              <div className="container">
                <div className="locationBox">
                  <div className="location"> {weather.name}, {weather.sys.country} </div>
                  <div className="date">{dateBuilder(new Date())}</div>
                </div>  

                <div className="weatherBox">
                  <div className="temp">{Math.round(weather.main.temp)}°c</div>
                  <div className="weather">{weather.weather[0].main}</div>
                </div>
              </div>
            </div>
            ) : ('') }
      </main>
    </div>
  );
}

export default App;
