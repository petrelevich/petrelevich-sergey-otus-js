import React from 'react';
import { Link } from 'react-router-dom'
import CityRemoveButton from "./CityRemoveButton";

const CityList = ({cityList}) =>
    {
        return (
            <div>
                <nav>
                    <table>
                        <tbody>
                            {cityList.map((city) =>
                                <tr key={city.name}>
                                    <td><Link to={{ pathname: `/city/${city.name}` }}>{city.name}</Link></td>
                                    <td><CityRemoveButton cityName={city.name}/></td>
                                </tr>)}
                        </tbody>
                    </table>
                </nav>
            </div>
        );
    }


export default CityList;

