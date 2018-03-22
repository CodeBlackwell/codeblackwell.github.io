import React, { Component } from 'react';
import styled from 'styled-components';
import { Polaroid } from './Projects.style';

class Projects extends Component {
    render() {
        // for (let key in styled) {
        //     console.log(key);
        // }
        return (
            <div>
                <Polaroid >
                    <img src={'http://i.imgur.com/tIDAnmM.png'} />
                    <h2>Gottem Coach!</h2>
                </Polaroid>
                <h1>This is projects</h1>

            </div>
        );
    }
}

export default Projects;