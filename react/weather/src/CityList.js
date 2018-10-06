import React from 'react';
import City from "./City.js"

function CityList({cities}) {
    return (
        <div align="left">
            <h2>Погода в городах</h2>
            {cities.map((city) => <City key={city.name} cityInfo={city} />)}
        </div>
    );
}


export default CityList;