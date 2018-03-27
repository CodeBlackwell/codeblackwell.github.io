import React, {Component} from 'react';
import styled from 'styled-components';
import {ScrollContainer, ScrollSection} from 'react-onepage-scroll';


import {Polaroid, Index, IndexContainer, ProjectDescription} from './Projects.style';
import {Container, Relative} from '../../theme/grid';
import {A, Title, H2} from '../../theme/types';

class Projects extends Component {
    render() {
        return (
            <Container>
                <Title>Projects</Title>
                <ScrollContainer>
                    <ScrollSection pageId={0}>
                        {/* Project 1*/}
                        <IndexContainer>
                            <Index>
                                <h1>01</h1>
                            </Index>
                        </IndexContainer>
                        <Polaroid >
                            <img src={'http://i.imgur.com/tIDAnmM.png'}/>
                            <h2>Polis</h2>
                        </Polaroid>
                        <ProjectDescription>
                            This Project incorporates all of the most cutting edge technologies into one
                            easy to use boilerplate
                        </ProjectDescription>
                    </ScrollSection>
                    <ScrollSection pageId={1}>
                        {/*Project 2*/}
                        <Relative>
                            <Index>
                                <h1>02</h1>
                            </Index>
                        </Relative>
                        <Polaroid >
                            <img src={'http://i.imgur.com/tIDAnmM.png'}/>
                            <h2>Polis</h2>
                        </Polaroid>
                        <ProjectDescription>
                            This Project incorporates all of the most cutting edge technologies into one
                            easy to use boilerplate
                        </ProjectDescription>
                    </ScrollSection>
                </ScrollContainer>


            </Container>
    );
    }
    }

    export default Projects;