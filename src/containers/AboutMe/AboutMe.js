import React, { Component } from 'react';
import { Container } from '../../theme/grid';
import { H2, H1 } from '../../theme/types';
import { Title } from './AboutMe.style';

class AboutMe extends Component {
    render() {
        return (
            <Container>
                <Title>About Me</Title>
                <H1 align="right">Do you like to stay active? Haha I can't help it!!</H1>
                <H2 align="right">Check out </H2>
            </Container>
        );
    }
}

export default AboutMe;