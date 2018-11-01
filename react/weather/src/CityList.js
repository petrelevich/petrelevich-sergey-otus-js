import React from 'react';
import City from "./City.js"

function CityList({cities, removeFunc}) {
    return (
        <div>
            {cities.map((city) => <City key={city.name} cityInfo={city} removeFunc={removeFunc} />)}
        </div>
    );
}


export default CityList;