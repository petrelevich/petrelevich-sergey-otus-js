import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter} from 'react-router-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const initialState = {
        cityFilter: "",
        cities: [
                {name: "Москва", data: {temperature: 10, wind: 1 ,humidity: 81}},
                {name: "Магнитогорск", data: {temperature: 12, wind: 2 ,humidity: 82}},
                {name: "Челябинск", data: {temperature: 13, wind: 3 ,humidity: 83}},
                ]
        }

function reducer(state = initialState, action) {
    if (action.type === 'ADD_CITY') {
        return {...state, cities: [...state.cities, action.payload]}
    }

    if (action.type === 'REMOVE_CITY') {
        return {...state, cities: state.cities.filter(city => city.name !== action.payload)}
    }

    if (action.type === 'SET_CITY_FILTER') {
        return {...state, cityFilter: action.payload}
    }
    return state;
}

const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
    console.log("subscribe", store.getState());
});

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
