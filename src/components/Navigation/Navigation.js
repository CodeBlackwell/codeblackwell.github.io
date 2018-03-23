import React, { Component } from 'react';
import { NavigationContainer, NavItem } from './Navigation.style';

class NavigationBar extends Component {
    render() {
        return (
            <NavigationContainer>
                <NavItem to="/">Home</NavItem>
                <NavItem to="/projects">Projects</NavItem>
                <NavItem to="/about">About me</NavItem>
            </NavigationContainer>
        );
    }
}

export default NavigationBar;