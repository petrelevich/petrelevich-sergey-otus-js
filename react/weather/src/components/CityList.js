import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {connect} from "react-redux";
import CityRemoveButton from "./CityRemoveButton";

class CityList extends Component {
    render() {
        return (
            <div>
                <nav>
                    <table>
                        <tbody>
                            {this.props.cities.map((city) =>
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
}

const mapStateToProps = state => {
    return {
        cities: state.cities
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CityList);

