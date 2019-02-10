import React, { Component } from 'react';
import {connect} from 'react-redux'
import CityList from "./CityList";
import Alert from "react-s-alert";
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

const successMsgOptions = {position: 'top', effect: 'slide',  timeout: 5000};
const errorMsgOptions = {position: 'top', effect: 'slide',  timeout: 'none'};


class HomeInt extends Component {
    constructor(props) {
        super(props);
    }

    addCity = () => {
        const newCityName = this.inputedCityName.value
        if ("" === newCityName) {
            Alert.error('Введите имя города', errorMsgOptions);
            return;
        }

        const existCity = this.props.cities.find((city) => {
            return city.name === newCityName;
        });

        if (existCity) {
            Alert.error("Город " + newCityName + " в списке уже есть", errorMsgOptions);
            return;
        }

        const city = {name: newCityName, data: {temperature: 10, wind: 1 ,humidity: 81}}
        this.props.onAddCity(city);

        Alert.success("Город " + newCityName + " добавлен в список", successMsgOptions);
    };

    searchCity = () => {
        this.props.onSetCityFilter(this.inputedCityName.value)
    };

    removeCity = (cityName) => {
        this.props.onRemoveCity(cityName);

        const existCity = this.props.cities.find((city) => {
            return city.name === cityName;
        });
        if (!existCity) {
            Alert.success("Город " + cityName + " удален из списка", successMsgOptions);
            return;
        }
    };

    render() {
        console.log(this.props.cities);
        return (
            <div>
                <h2>Погода в городах</h2>
                <div className="CtrPanel">
                    <div>
                        <input type="text"
                               placeholder="Город..."
                               ref={(input) => {this.inputedCityName = input}}
                        />
                        <button onClick={this.addCity}>
                            Добавить город
                        </button>
                    </div>
                    <div>
                        <button onClick={this.searchCity}>
                            Искать город
                        </button>
                    </div>
                </div>
                <CityList cities={this.props.cities} removeFunc={this.removeCity}/>
                <Alert stack={{limit: 3}}/>
            </div>
        )
    }
}

const filterCities = (cities, cityFilter) => {
   return cities.filter(city => city.name.toLowerCase().indexOf(cityFilter.toLowerCase()) > -1);
}


const mapStateToProps = state => {
    return {
        cities: filterCities(state.cities, state.cityFilter)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddCity: newCity => {dispatch({type: 'ADD_CITY', payload: newCity})},
        onRemoveCity: cityName => {dispatch({type: 'REMOVE_CITY', payload: cityName})},
        onSetCityFilter: cityFilter => {dispatch({type: 'SET_CITY_FILTER', payload: cityFilter})}

    }
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeInt);
export default Home
