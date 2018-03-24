import React, {Component} from 'react';
import ReactPlayer from 'react-player';
import {ScrollSection, ScrollContainer} from 'react-onepage-scroll';

import {Container} from '../../theme/grid';
import {H2, H1} from '../../theme/types';

import Section from '../../components/QASection/QASection';
import {Title, VideoContainer} from './AboutMe.style';
import WhenInView from '../../components/WhenInView/WhenInView';
import {RevealQASection} from './AboutMe.style';

class AboutMe extends Component {
    render() {
        return (
            <Container>
                <Title>About Me</Title>
                <ScrollContainer>
                    {/*<ScrollSection pageId={0}>*/}
                        {/*<H1 align="right">Do you like to stay active? Haha I can't help it!!</H1>*/}
                        {/*<H2 align="right">Check out </H2>*/}
                        {/*<VideoContainer>*/}
                            {/*<ReactPlayer url={require('../../assets/IMG_2510.mp4')} controls={true}/>*/}
                        {/*</VideoContainer>*/}

                    {/*</ScrollSection>*/}
                    <ScrollSection pageId={0}>
                        <Section
                            question="Soo what sports am I into?"
                            justify="flex-end"
                            align="flex-end"
                            qIndex="2"
                            answer="Well they change every so often but right now I love Rock Climbing!!"
                        />
                    </ScrollSection>
                    <ScrollSection pageId={1}>
                        <Section
                            question="Soo what sports am I into?"
                            justify="flex-start"
                            align="flex-end"
                            qIndex="3"
                            answer="Well they change every so often but right now I love Rock Climbing!!"
                        />
                    </ScrollSection>

                </ScrollContainer>
            </Container>
        );
    }
}

export default AboutMe;