import React from 'react';
import { Link } from 'react-router-dom'

const CityList = ({cityList, removeCityFunction}) =>
    {
        return (
            <div>
                <nav>
                    <table>
                        <tbody>
                        {cityList.map((city) =>
                            <tr key={city.name}>
                                <td><Link to={{
                                    pathname: `/city/${city.name}`,
                                    state: {city: city}
                                }}>{city.name}</Link></td>
                                <td><button onClick={() => removeCityFunction(city.name)}>Удалить город </button></td>
                            </tr>)}
                        </tbody>
                    </table>
                </nav>
            </div>
        );
    }


export default CityList;

