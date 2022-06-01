import React, { useState, useEffect } from "react";
import isoFetch from 'isomorphic-fetch';

import './Weather.css';

const Weather = () => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        let isSubscribed = true;
        // declare the async data fetching function
        const fetchData = async () => {
            // get the response from the api
            const response = await isoFetch('https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=27.6&lat=53.9&units=metric&lang=en', {
                method: "GET",
                headers: {
                    "x-rapidapi-key": "a23fde569amsh2fcccf77b8c2684p1cc171jsna3898ae0703d",
                    "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
                },
            });
            // convert the data to json
            const data = (await response.json()).data[0];
            // setWeather with the result if `isSubscribed` is true
            if (isSubscribed) {
                setWeather(data);
            }
        }

        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);
        
        // cancel any future `setData`
        return () => isSubscribed = false;
    }, []);
    if (weather) {
        return (
            <div className="Content">
                <div className="TempBox">
                    <div className="CurrentTemp">
                        <div className="TempNum">{parseInt(weather.temp)}</div>
                        <div className="Exponent">°c</div>
                    </div>
                    <div className="FeelsLike">FEELS LIKE:</div>
                    <div className="AppTemp">{parseInt(weather.app_temp)}°c</div>
                </div>
                {weather ? (
                    <img
                        src={`https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png`}
                        alt="weather icon"
                    />
                ) : null}

                <div className="InfoBox">
                    <div className="Description">{weather.weather.description}</div>
                    <div className="Info">
                        <div>Humidity: {weather.rh}%</div>
                        <div>Precipitation: {weather.precip} mm/h</div>
                        <div>Snow: {weather.snow} mm/h</div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <div>Loading weather...</div>;
    }
};

export default Weather;