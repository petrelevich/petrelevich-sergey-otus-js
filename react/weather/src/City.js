import React, { Component } from 'react';

class City extends Component {
    removeCity = () => {
        this.props.removeFunc(this.props.cityInfo.name);
    }

    render() {
        return (
            <table border="1">
                <caption>город: {this.props.cityInfo.name}</caption>
                <tbody>
                <tr>
                    <th>температура, °</th>
                    <th>ветер, м/с</th>
                    <th>влажность, %</th>
                    <th></th>
                </tr>
                <tr>
                    <td>{this.props.cityInfo.data.temperature}</td>
                    <td>{this.props.cityInfo.data.wind}</td>
                    <td>{this.props.cityInfo.data.humidity}</td>
                    <td><button onClick={this.removeCity}>Удалить город</button></td>
                </tr>
                </tbody>
            </table>
        );
    }
}

export default City;
