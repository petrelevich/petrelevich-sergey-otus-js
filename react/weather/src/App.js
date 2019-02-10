import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import Home from "./components/Home";
import City from "./components/City";


class App extends Component {
  render() {
    return (
        <div className="App">
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/city' component={City}/>
            </Switch>
        </div>
    );
  }
}

export default App;
