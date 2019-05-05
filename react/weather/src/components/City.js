import React, { Component } from 'react';

class City extends Component {
    getCityInfo = () => {
        return this.props.location.state.city;
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

export default City;
