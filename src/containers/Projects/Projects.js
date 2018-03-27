import React, {Component} from 'react';
import styled from 'styled-components';

import {Polaroid, Index} from './Projects.style';
import {Container, Relative} from '../../theme/grid';
import {A, Title} from '../../theme/types';

class Projects extends Component {
    render() {
        return (
            <Container>
                <Title>Projects</Title>
                {/* Project 1*/}
                <Relative>
                    <Index>
                        <h1>01</h1>
                    </Index>
                    <h1>Polis</h1>
                </Relative>
                <Polaroid >
                    <img src={'http://i.imgur.com/tIDAnmM.png'}/>
                    <h2>Polis</h2>
                </Polaroid>
                {/*Project 2*/}
                <Relative>
                    <Index>
                        <h1>02</h1>
                    </Index>
                    <h1>Isomorphic React</h1>
                </Relative>
                <Polaroid >
                    <img src={'http://i.imgur.com/tIDAnmM.png'}/>
                    <h2>Isomorphic React</h2>
                </Polaroid>


            </Container>
        );
    }
}

export default Projects;