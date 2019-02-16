import React, { Component } from 'react';
import {connect} from 'react-redux'

class City extends Component {
    getCityInfo = () => {
        const cityName = this.props.match.params.cityName;
        return this.props.cities.find((city) => city.name === cityName);
    }

    render() {
        return (
            <table border="1">
                <caption>город: {this.getCityInfo().name} </caption>
                <tbody>
                <tr>
                    <th>температура, °</th>
                    <th>ветер, м/с</th>
                    <th>влажность, %</th>
                </tr>
                <tr>
                    <td>{this.getCityInfo().data.temperature}</td>
                    <td>{this.getCityInfo().data.wind}</td>
                    <td>{this.getCityInfo().data.humidity}</td>
                </tr>
                </tbody>
            </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(City);
