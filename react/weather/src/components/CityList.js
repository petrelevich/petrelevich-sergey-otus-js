import React from 'react';
import City from "./City.js"


function CityList({cities, citiesFilter, removeFunc}) {
    console.log("debug");
    console.log(cities);
    return (
        <div>
            {cities.filter(city => city.name.toLowerCase().indexOf(citiesFilter.toLowerCase()) > -1).map((city) => <City key={city.name} cityInfo={city} removeFunc={removeFunc} />)}
        </div>
    );
}

export default CityList

