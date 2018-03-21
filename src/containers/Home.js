import React, { Component, PropTypes } from 'react';

export default class Home extends Component {
    static propTypes = {};

    render() {
        return (
            <div>
                <h1>Hi Home!</h1>
                <img src={require('../assets/Me.jpg')} alt="Me"/>
            </div>
        )
    }
}