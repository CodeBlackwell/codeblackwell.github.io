import React, { Component } from 'react';
import ReactPlayer from 'react-player';

import { Container } from '../../theme/grid';
import { H2, H1 } from '../../theme/types';

import QASection from '../../components/QASection/QASection';
import { Title, VideoContainer } from './AboutMe.style';

class AboutMe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            question2: false,
            question3: false,
        };

        this.showQuestion = this.showQuestion.bind(this);
    }
    render() {
        return (
            <Container>
                <Title>About Me</Title>
                <H1 align="right">Do you like to stay active? Haha I can't help it!!</H1>
                <H2 align="right">Check out </H2>
                <VideoContainer>
                    <ReactPlayer url={require('../../assets/IMG_2510.mp4')} controls={true} />
                </VideoContainer>
                <QASection
                    question="What is my favorite sport?"
                    answer="Well it changes every so often but right now I love Rock Climbing!!"
                />
            </Container>
        );
    }

    showQuestion(number) {
        this.setState({ ['question' + number]: true})
    }
}

export default AboutMe;