import React, { Component } from 'react';
import './App.css';
import './CityList'
import CityList from "./CityList";
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

const testData = [
    {name: "Москва", data: {temperature: 10, wind: 1 ,humidity: 81}},
    {name: "Магнитогорск", data: {temperature: 12, wind: 2 ,humidity: 82}},
    {name: "Челябинск", data: {temperature: 13, wind: 3 ,humidity: 83}},
];

const successMsgOptions = {position: 'top', effect: 'slide',  timeout: 5000};
const errorMsgOptions = {position: 'top', effect: 'slide',  timeout: 'none'};

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {cities : testData, newCityName: ""};
  }

  handleCityName = (event) => {
        this.setState({ newCityName: event.target.value });
  };

  addCity = () => {
    if ("" === this.state.newCityName) {
        Alert.error('Введите имя города', errorMsgOptions);
        return;
    }

    const existCity = this.state.cities.find((city) => {
        return city.name === this.state.newCityName;
    });

    if (existCity) {
        Alert.error("Город " + this.state.newCityName + " в списке уже есть", errorMsgOptions);
        return;
    }

    const city = {name: this.state.newCityName, data: {temperature: 10, wind: 1 ,humidity: 81}}
    this.setState({cities : this.state.cities.concat([city])});

    Alert.success("Город " + this.state.newCityName + " добавлен в список", successMsgOptions);
  };

  removeCity = (cityName) => {
      const newCities = this.state.cities.slice();
      for (let idx = 0; idx < this.state.cities.length; idx++) {
          if (this.state.cities[idx].name === cityName) {
              newCities.splice(idx, 1);
              this.setState({cities : newCities});
              Alert.success("Город " + cityName + " удален из списка", successMsgOptions);
              return;
          }
      }
  };

  render() {
    return (
       <div className="App">
            <h2>Погода в городах</h2>
            <div>
                <input type="text"
                      placeholder="Город..."
                      value={this.state.newCityName}
                      onChange={this.handleCityName}/>

                <button onClick={this.addCity}>
                   Добавить город
                </button>
            </div>
                <CityList cities={this.state.cities} removeFunc={this.removeCity} />
            <Alert stack={{limit: 3}} />
       </div>
    );
  }
}

export default App;
