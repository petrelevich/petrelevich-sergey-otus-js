import React, { Component } from 'react';
import {connect} from "react-redux";


class CityRemoveButton extends Component {
    removeCity = () => {
        this.props.onRemoveCity(this.props.cityName);
        console.log(this.props.cities);
    };

    render() {
        return (
            <button onClick={this.removeCity}>Удалить город</button>
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
        onRemoveCity: cityName => {dispatch({type: 'REMOVE_CITY', payload: cityName})},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CityRemoveButton) ;