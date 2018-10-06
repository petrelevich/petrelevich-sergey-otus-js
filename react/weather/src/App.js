import React, { Component } from 'react';
import './App.css';
import './CityList'
import CityList from "./CityList";

const testDate = [
    {name: "Москва", data: {temperature: 10, wind: 1 ,humidity: 81}},
    {name: "Магнитогорск", data: {temperature: 12, wind: 2 ,humidity: 82}},
    {name: "Челябинск", data: {temperature: 13, wind: 3 ,humidity: 83}},
];

class App extends Component {
  constructor() {
      super();
      this.addCity = this.addCity.bind(this);
      this.removeCity = this.removeCity.bind(this);
      this.state = {cities : testDate, newCityName: ""};
  }

  render() {
    return (
      <div className="App">
          <CityList cities = {this.state.cities} />
          <div>
              <input type="text"
                  placeholder="Город..."
                  value={this.state.newCityName}
                  onChange={this.handleCityName}/>

              <button onClick={this.addCity}>
                  Добавить город
              </button>
              <button onClick={this.removeCity}>
                  Удалить город
              </button>
          </div>
      </div>
    );
  }

  handleCityName = (event) => {
        this.setState({ newCityName: event.target.value });
  };

  addCity = () => {
    if ("" === this.state.newCityName) {
        this.props.alert.show('Oh look, an alert!')
        alert("Введите имя города");
    } else {
        for (let idx = 0; idx < this.state.cities.length; idx++) {
            if (this.state.cities[idx].name === this.state.newCityName) {
                alert("Город " + this.state.newCityName + " в списке уже есть");
                return;
            }
        }
        const city = {name: this.state.newCityName, data: {temperature: 10, wind: 1 ,humidity: 81}}
        this.state.cities.push(city);
        this.setState({cities : this.state.cities});
    }
  }

  removeCity = () => {
      if ("" === this.state.newCityName) {
          alert("Введите имя города");
      } else {
          for (let idx = 0; idx < this.state.cities.length; idx++) {
              if (this.state.cities[idx].name === this.state.newCityName) {
                  this.state.cities.splice(idx, 1);
                  this.setState({cities : this.state.cities});
                  return;
              }
          }
      }
  }
}

export default App;
