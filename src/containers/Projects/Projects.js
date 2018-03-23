import React, { Component } from 'react';
import styled from 'styled-components';

import { Polaroid } from './Projects.style';
import { Container } from '../../theme/grid';

class Projects extends Component {
    render() {
        return (
            <Container>
                <h1>This is projects</h1>
                <Polaroid >
                    <img src={'http://i.imgur.com/tIDAnmM.png'} />
                    <h2>Polis</h2>
                </Polaroid>

            </Container>
        );
    }
}

export default Projects;